"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface NFT {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default function TrendingNFTs() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNFTs() {
      try {
        // Placeholder API – replace with real endpoint
        const res = await fetch("https://api.example.com/trending-nfts");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        // Assume data is an array of NFT objects
        setNfts(data.slice(0, 10));
      } catch (error) {
        console.error(error);
        // Fallback to static data
        setNfts([
          {
            id: "1",
            name: "CryptoPunk #1",
            image: "/placeholder.png",
            description: "A unique CryptoPunk NFT.",
          },
          {
            id: "2",
            name: "Bored Ape #2",
            image: "/placeholder.png",
            description: "A rare Bored Ape NFT.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchNFTs();
  }, []);

  if (loading) {
    return <p>Loading trending NFTs...</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {nfts.map((nft) => (
        <Card key={nft.id} className="p-4">
          <CardHeader>
            <h3 className="text-lg font-semibold">{nft.name}</h3>
          </CardHeader>
          <CardContent>
            <Image
              src={nft.image}
              alt={nft.name}
              width={200}
              height={200}
              className="rounded-md"
            />
            <p className="mt-2 text-sm text-muted-foreground">{nft.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
