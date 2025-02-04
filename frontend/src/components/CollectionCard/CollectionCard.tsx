import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CollectionCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  buttonText: string;
};

const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  description,
  imageUrl,
  link,
  buttonText,
}) => {
  return (
    <Card className="px-6 border border-gray-300 rounded-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <Image
          height={350}
          width={256}
          src={imageUrl}
          alt={title}
          className="rounded-lg w-full h-[350px] object-cover object-top"
        />
        <Link href={link}>
          <Button variant="link" className="mt-4">
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
