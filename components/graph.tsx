"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';

// Dynamically import ForceGraph2D to disable SSR
const ForceGraph2D = dynamic(() => import('react-force-graph').then(mod => mod.ForceGraph2D), { ssr: false });

type Node = {
  id: string;
  name: string;
  group: 'name' | 'offering';
  x?: number;
  y?: number;
};

type Link = {
  source: string;
  target: string;
};

type HomepageComponentProps = {
  accelerators: Promise<{ id: number; name: string; offerings: string[] }[]>;
};

export function HomepageComponent({ accelerators }: HomepageComponentProps) {
  const [graphData, setGraphData] = useState<{ nodes: Node[], links: Link[] }>({ nodes: [], links: [] });

  useEffect(() => {
    accelerators.then(data => {
      const nodes: Node[] = [];
      const links: Link[] = [];

      data.forEach(accelerator => {
        // Add the accelerator as a node
        nodes.push({ id: `name-${accelerator.id}`, name: accelerator.name, group: 'name' });

        // Add each offering as a node and create a link
        accelerator.offerings.forEach(offering => {
          nodes.push({ id: `offering-${offering}`, name: offering, group: 'offering' });
          links.push({ source: `name-${accelerator.id}`, target: `offering-${offering}` });
        });
      });

      setGraphData({ nodes, links });
    });
  }, [accelerators]);

  return (
    <Card>
      <CardContent>
        <ForceGraph2D
          graphData={graphData}
          nodeAutoColorBy="group"
          nodeLabel="name"
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            // Draw the node as a circle
            const radius = 5;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.fill();

            // Draw the label if zoom level is above a certain threshold
            if (globalScale > 1.5) {
              const label = node.name;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.fillStyle = 'black';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(label, node.x, node.y + radius + fontSize);
            }
          }}
        />
      </CardContent>
    </Card>
  );
}