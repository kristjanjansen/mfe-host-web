export type Mandate = {
  id: string;
  type: string;
  label: string;
};

export type Session = {
  authenticated: boolean;
  user: { id: string; name: string; email: string };
  mandates: Mandate[];
  activeMandate: string;
};

export function useAuth(): Session {
  return (window as any).__MFE_AUTH__;
}

export function switchMandate(mandateId: string) {
  const auth = (window as any).__MFE_AUTH__ as Session;
  auth.activeMandate = mandateId;
  window.dispatchEvent(
    new CustomEvent("mfe:mandate-changed", { detail: { mandateId } })
  );
}
