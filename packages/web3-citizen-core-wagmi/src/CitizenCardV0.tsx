import * as React from 'react';
import { useContractRead, useProvider } from 'wagmi';
import classNames from 'classnames';
import CitizenAlpha from '@web3-citizen/core-sol/deployments/mainnet/CitizenAlpha.json';
import { IpfsUriImageBackgroundRender } from '@turbo-eth/core-wagmi';
import { Address } from '@turbo-eth/core-wagmi';
import { parseAvatarString } from '@turbo-eth/ens-wagmi';
// import CitizenLink from './CitizenLink';

const Trait = ({ value, label }: any) => {
  if (!value) return null;
  return (
    <div>
      {label}: {value}
    </div>
  );
};

interface CitizenCardProps {
  className?: string;
  classNameImage?: string;
  tokenId: string | number;
}

export const CitizenCard = ({
  className,
  classNameImage,
  tokenId = '0',
}: CitizenCardProps) => {
  const containerClassName = classNames(className, 'CitizenCard');
  const provider = useProvider();
  const { data, isError } = useContractRead(
    {
      addressOrName: CitizenAlpha.address,
      contractInterface: CitizenAlpha.abi,
    },
    'tokenURI',
    {
      args: [tokenId],
    }
  );

  const [citizenData, setCitizenData] = React.useState<{
    image: string;
    img: string;
    name: string;
    description: string;
    traits: {
      [key: string]: string;
    };
    attributes: Array<{
      value: string;
    }>;
  }>();
  React.useEffect(() => {
    if (data) {
      (async () => {
        const json = Buffer.from(data.substring(29), 'base64').toString();
        const result = JSON.parse(json);
        result.img = await parseAvatarString(
          '0x3417aD1d79D9508912E8d7f3B9167085500b12CE',
          result.image,
          provider
        );
        result.traits = {};
        result.attributes.forEach((element: any) => {
          result.traits = {
            ...result.traits,
            [element.trait_type]: element.value,
          };
        });

        setCitizenData(result);
      })();
    }
  }, [data]);

  if (isError) {
    return <div>Error requesting NFT data</div>;
  }

  return (
    <div className={containerClassName}>
      <IpfsUriImageBackgroundRender
        className={classNameImage}
        uri={citizenData?.img || ''}
      />{' '}
      {/* <h3 className="font-normal text-xl my-3">

        {citizenData?.attributes[2].value != '' ? (
          <div className=''>
            <span className="">{citizenData?.attributes[2].value}</span>
          </div>
        ) : <EnsName address={citizenData?.attributes[0].value} />}
      </h3> */}
      <h3 className="font-normal text-xl my-3">
        {citizenData?.description.length == 42 ? (
          <Address truncate address={citizenData?.description} />
        ) : (
          citizenData?.description
        )}
      </h3>
      <hr
        className="my-6 opacity-5"
        style={{ marginTop: 6, marginBottom: 6, opacity: '0.35' }}
      />
      {
        // @ts-ignore
        citizenData?.attributes?.length > 0 && (
          <>
            <Trait
              label="description"
              value={citizenData?.traits['description']}
            />
            <Trait label="twitter" value={citizenData?.traits['com.twitter']} />
            <Trait label="github" value={citizenData?.traits['com.github']} />
            <hr
              className="my-6 opacity-5"
              style={{ marginTop: 6, marginBottom: 6, opacity: '0.35' }}
            />
          </>
        )
      }
      <div className="block">
        <span className="block font-bold text-sm">{citizenData?.name}</span>
        <span className="block font-normal text-sm">
          Invited By: <Address truncate address={citizenData?.traits['link']} />
        </span>
      </div>
    </div>
  );
};

export default CitizenCard;
