import { itemGraphView } from '@/lib/search';
import { GraphComponent } from "@/components/graph";

export default async function Page() {
  const itemData = await itemGraphView();

  return (
    <GraphComponent 
      acceleratorItems={itemData.acceleratorItems} 
    />
  );
}