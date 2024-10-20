import { acceleratorGraphView } from '@/lib/db';
import { HomepageComponent } from "@/components/graph"

// Get accelerators from the database
async function fetchAccelerators() {
	return await acceleratorGraphView() || []
}

export default function Page() {
  let acceleratorData = fetchAccelerators()
  return (
    <HomepageComponent accelerators={acceleratorData}/>
  )
}