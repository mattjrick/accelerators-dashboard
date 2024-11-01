"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/common/card';
import { Spinner } from './icons';

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
  acceleratorItems: { id: number; name: string; linkedService: string | null; linkedAccelerators: string[] | null }[];
};

export function GraphComponent({ acceleratorItems }: GraphComponentProps) {
  const [graphData, setGraphData] = useState<{ nodes: Node[], links: Link[] }>({ nodes: [], links: [] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Add accelerator items as nodes and create links
    acceleratorItems.forEach(accelerator => {
      nodes.push({ id: `accelerator-${accelerator.id}`, name: accelerator.name, group: 'name' });

      // Link accelerator to its linked service
      if (accelerator.linkedService) {
        if (!nodes.find(node => node.id === `linkedService-${accelerator.linkedService}`)) {
          nodes.push({ id: `linkedService-${accelerator.linkedService}`, name: accelerator.linkedService, group: 'linkedService' });
        }
        links.push({ source: `linkedService-${accelerator.linkedService}`, target: `accelerator-${accelerator.id}` });
      }

      // Link accelerator to its linked accelerators
      accelerator.linkedAccelerators?.forEach(linkedAccelerator => {
        if (!nodes.find(node => node.id === `accelerator-${linkedAccelerator}`)) {
          nodes.push({ id: `accelerator-${linkedAccelerator}`, name: linkedAccelerator, group: 'name' });
        }
        links.push({ source: `accelerator-${accelerator.id}`, target: `accelerator-${linkedAccelerator}` });
      });
    });

    setGraphData({ nodes, links });
    setLoading(false); // Set loading to false once data is processed
  }, [acceleratorItems]);

  if (loading) {
    return < Spinner />; // Render loading indicator while data is being fetched
  }

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