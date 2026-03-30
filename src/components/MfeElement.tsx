import type { ReactNode } from "react";

import type { MfeConfig } from "../config/config";
import { useMfeScript } from "../utils/utils";
import { Loading } from "./Loading";

export function MfeElement({
  mfe,
  slot,
  children,
}: {
  mfe: MfeConfig;
  slot?: string;
  children?: ReactNode;
}) {
  const ready = useMfeScript(mfe);

  if (!ready) {
    return <Loading slot={slot} />;
  }

  const Tag = mfe.tag as any;
  const basePath = mfe.path ?? "/";

  if (children != null) {
    return <Tag slot={slot} base-path={basePath}>{children}</Tag>;
  }

  return <Tag slot={slot} base-path={basePath} />;
}
