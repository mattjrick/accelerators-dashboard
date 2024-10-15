//import { db, accelerators } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    message: 'Uncomment to seed data after DB is set up.'
  });

//  const mockAccelerators = [
//    { id: 1, name: 'Cloud Foundations', offerings: ['Core Cloud'] },
//    { id: 2, name: 'DR Migrate', offerings: ['Discovery', 'Datacentre', 'Polycloud'] },
//    { id: 3, name: 'Sentinel Migration', offerings: ['DevSecOps', 'Secure by Design'] },
//    { id: 4, name: 'Vision Workshop', offerings: ['Cloud strategy'] },
//    { id: 5, name: 'Azure Landing Zone', offerings: ['Platform', 'Architecture'] },
//    { id: 6, name: 'AWS Landing Zone', offerings: ['Platform', 'Architecture'] },
//    { id: 7, name: 'AEP', offerings: ['Automation', 'CICD'] },
//    { id: 8, name: 'Cost Automation', offerings: ['FinOps'] },
//    { id: 9, name: 'Green Gauge', offerings: ['Carbon Reduction'] },
//  ];
//  
//  await db.insert(accelerators).values(
//    mockAccelerators.map(acc => ({
//      id: acc.id,
//      name: acc.name,
//      offerings: JSON.stringify(acc.offerings),
//    }))
//  );
}
