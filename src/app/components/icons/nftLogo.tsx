import Image from "next/image";

export default function nftLogo({ className }) {
  return (
    <Image src="/nft.svg" alt={""} width="40" height="40" className={className} />
  )
}