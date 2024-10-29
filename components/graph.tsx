"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';

// Dynamically import ForceGraph2D to disable SSR
const ForceGraph2D = dynamic(() => import('react-force-graph').then(mod => mod.ForceGraph2D), { ssr: false });

type Node = {
  id: string;
  name: string;
  group: 'linkedService' | 'name';
  x?: number;
  y?: number;
};

type Link = {
  source: string;
  target: string;
};

type GraphComponentProps = {
  accelerators: Promise<{ id: number; name: string; linkedService: string; linkedAccelerators: string[] }[]>;
};

export function GraphComponent({ accelerators }: GraphComponentProps) {
  const [graphData, setGraphData] = useState<{ nodes: Node[], links: Link[] }>({ nodes: [], links: [] });

  useEffect(() => {
    accelerators.then(data => {
      const nodes: Node[] = [];
      const links: Link[] = [];

      data.forEach(accelerator => {
        // Add the accelerator as a node
        nodes.push({ id: `name-${accelerator.id}`, name: accelerator.name, group: 'name' });

        // Add the linked service as a node and create a link
        if (!nodes.find(node => node.id === `linkedService-${accelerator.linkedService}`)) {
          nodes.push({ id: `linkedService-${accelerator.linkedService}`, name: accelerator.linkedService, group: 'linkedService' });
        }
        links.push({ source: `linkedService-${accelerator.linkedService}`, target: `name-${accelerator.id}` });

        // Add linked accelerators as nodes and create links
        accelerator.linkedAccelerators.forEach(linkedAccelerator => {
          if (!nodes.find(node => node.id === `name-${linkedAccelerator}`)) {
            nodes.push({ id: `name-${linkedAccelerator}`, name: linkedAccelerator, group: 'name' });
          }
          links.push({ source: `name-${accelerator.id}`, target: `name-${linkedAccelerator}` });
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
            ctx.arc(node.x ?? 0, node.y ?? 0, radius, 0, 2 * Math.PI, false);
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
              ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + radius + fontSize);
            }
          }}
        />
      </CardContent>
    </Card>
  );
}