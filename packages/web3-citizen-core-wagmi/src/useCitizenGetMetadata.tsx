import { useContractRead, useProvider } from 'wagmi';
import CitizenAlpha from '@web3-citizen/core-sol/artifacts/contracts/CitizenAlpha.sol/CitizenAlpha.json';
import { useEffect, useState } from 'react';
import { parseAvatarString } from '@turbo-eth/ens-wagmi';

export function useCitizenGetMetadata(
  address: string,
  walletAddress: string,
  tokenId: string | number
): any {
  const provider = useProvider();
  const { data } = useContractRead(
    {
      addressOrName: address,
      contractInterface: CitizenAlpha.abi,
    },
    'tokenURI',
    {
      args: [tokenId],
    }
  );

  const [citizenData, setCitizenData] = useState<{
    image: string;
    name: string;
    description: string;
    traits: {
      [key: string]: string;
    };
    attributes: Array<{
      value: string;
    }>;
  }>();

  useEffect(() => {
    if (data) {
      (async () => {
        const json = Buffer.from(data.substring(29), 'base64').toString();
        const result = JSON.parse(json);
        result.img = await parseAvatarString(
          walletAddress,
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

  return citizenData;
}

export default useCitizenGetMetadata;
