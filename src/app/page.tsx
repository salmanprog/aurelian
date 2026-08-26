import { getProducts } from "@/lib/data";
import { Hero, ChaosTransition } from "@/components/home/Hero";
import { Manifesto, CraftFilm } from "@/components/home/Manifesto";
import { ObjectsGallery } from "@/components/home/ObjectsGallery";
import { DropSection, PrivateRoom } from "@/components/home/DropSection";
import { MaterialExplorer, CodePanels } from "@/components/home/HouseSystems";
import {
  ManBehindObject,
  NotForEveryone,
  Newsletter,
  FinalCinematic,
} from "@/components/home/Editorial";
import { Footer } from "@/components/site/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ChaosTransition />
      <Manifesto />
      <ObjectsGallery products={products} />
      <DropSection />
      <PrivateRoom />
      <CraftFilm />
      <MaterialExplorer />
      <CodePanels />
      <ManBehindObject />
      <NotForEveryone />
      <Newsletter />
      <FinalCinematic />
      <Footer />
    </>
  );
}
