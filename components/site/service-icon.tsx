import {
  RiAlarmWarningLine,
  RiDropLine,
  RiFireLine,
  RiLeafLine,
  RiShowersLine,
  RiSunLine,
  RiTempHotLine,
  RiToolsLine,
} from "@remixicon/react";
import type { ServiceIcon as IconKey } from "@/content/services";

const map = {
  alarm: RiAlarmWarningLine,
  tools: RiToolsLine,
  fire: RiFireLine,
  radiant: RiTempHotLine,
  shower: RiShowersLine,
  sun: RiSunLine,
  drop: RiDropLine,
  leaf: RiLeafLine,
} satisfies Record<IconKey, unknown>;

export function ServiceIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const Icon = map[icon];
  return <Icon className={className} aria-hidden="true" />;
}
