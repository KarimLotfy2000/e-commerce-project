import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
        <div className="relative w-full h-[550px]">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
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
