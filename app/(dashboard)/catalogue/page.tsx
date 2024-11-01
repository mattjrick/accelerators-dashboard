import { searchItems } from '@/lib/search';
import TabsComponent from '../../../components/ui/items/item-tabs'; // Import the updated TabsComponent

export default async function CataloguePage(
  props: {
    searchParams: Promise<{ q: string; offset: string; type: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const type = searchParams.type as 'accelerator' | 'service' | undefined;
  const { items, newOffset, totalItems, itemNames } = await searchItems(
    search,
    Number(offset),
    type
  );

  return (
    <TabsComponent 
      type={type} 
      items={items} 
      newOffset={newOffset} 
      itemNames={itemNames} 
      totalItems={totalItems} 
    />
  );
}