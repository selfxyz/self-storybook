import React from 'react';

// Minimal web shims for components referenced in stories
export const AbstractButton: React.FC<{
  children?: React.ReactNode;
  onPress?: () => void;
  bgColor?: string;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}> = ({ children, onPress, bgColor, color, borderColor, borderWidth }) => {
  const hasBorder = !!borderColor && !!borderWidth && borderWidth > 0;
  return (
    <button
      type="button"
      onClick={onPress}
      style={{
        backgroundColor: bgColor,
        color,
        borderColor: hasBorder ? borderColor : undefined,
        borderWidth: hasBorder ? borderWidth : undefined,
        borderStyle: hasBorder ? 'solid' : undefined,
        padding: 12,
        borderRadius: 8,
      }}
    >
      {children}
    </button>
  );
};

export const PrimaryButton: React.FC<{
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}> = ({ children, onPress, disabled }) => {
  const hasBorder = false; // neutral: no border unless provided by real component
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      style={{
        backgroundColor: undefined,
        color: undefined,
        padding: 12,
        borderRadius: 8,
        border: hasBorder ? '1px solid #000000' : undefined,
      }}
    >
      {children}
    </button>
  );
};

export const SecondaryButton: React.FC<{
  children?: React.ReactNode;
  onPress?: () => void;
}> = ({ children, onPress }) => {
  const hasBorder = false; // neutral: no border by default
  return (
    <button
      type="button"
      onClick={onPress}
      style={{
        backgroundColor: undefined,
        color: undefined,
        padding: 12,
        borderRadius: 8,
        border: hasBorder ? '1px solid #000000' : undefined,
      }}
    >
      {children}
    </button>
  );
};

export const Additional: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <span style={{ fontSize: 12, color: '#64748b' }}>{children}</span>;
};

export const BodyText: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <p style={{ fontSize: 16, color: '#111827', margin: 0 }}>{children}</p>;
};

export const Caption: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <span style={{ fontSize: 12, color: '#6b7280' }}>{children}</span>;
};

export const Title: React.FC<{ children?: React.ReactNode; size?: 'large' }> = ({
  children,
  size,
}) => {
  const fontSize = size === 'large' ? 38 : 28;
  const lineHeight = size === 'large' ? 47 : 35;
  return (
    <h1 style={{ fontSize, lineHeight: `${lineHeight}px`, margin: 0, color: '#000' }}>
      {children}
    </h1>
  );
};

export const SubHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <h2 style={{ fontSize: 20, lineHeight: '28px', margin: 0, color: '#000' }}>{children}</h2>;
};

// Additional placeholder components used by stories
export const Caution: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <span style={{ fontSize: 14, color: '#b45309' }}>{children}</span>;
};

export const Description: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>{children}</p>;
};

export const DescriptionTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <h3 style={{ fontSize: 16, lineHeight: '24px', margin: 0, color: '#111827' }}>{children}</h3>
  );
};

export const HeldPrimaryButton: React.FC<{
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}> = ({ children, onPress, disabled }) => {
  const hasBorder = false; // neutral
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      style={{
        backgroundColor: undefined,
        color: undefined,
        padding: 12,
        borderRadius: 8,
        border: hasBorder ? '1px solid #111827' : undefined,
      }}
    >
      {children}
    </button>
  );
};

export const HeldPrimaryButtonProveScreen: React.FC<{
  children?: React.ReactNode;
  onVerify?: () => void;
  selectedAppSessionId?: string | null;
  hasScrolledToBottom?: boolean;
  isReadyToProve?: boolean;
}> = ({ children, onVerify, selectedAppSessionId, hasScrolledToBottom, isReadyToProve }) => {
  const hasBorder = false; // neutral

  // Derive a simple placeholder label to mirror native behavior
  let derivedLabel = 'Preparing...';
  if (!selectedAppSessionId) {
    derivedLabel = 'Select a session';
  } else if (!hasScrolledToBottom) {
    derivedLabel = 'Scroll to bottom';
  } else if (isReadyToProve) {
    derivedLabel = 'Hold to Verify';
  }

  const content = children ?? derivedLabel;

  return (
    <button
      type="button"
      onClick={onVerify}
      aria-label={typeof content === 'string' ? content : 'Prove'}
      style={{
        backgroundColor: '#f3f4f6',
        color: '#111827',
        padding: 12,
        borderRadius: 8,
        minWidth: 160,
        border: hasBorder ? '1px solid #111827' : '1px solid #d1d5db',
      }}
    >
      {content}
    </button>
  );
};

export const RoundFlag: React.FC<{ countryCode?: string; size?: number }> = ({
  countryCode,
  size = 24,
}) => {
  const display = countryCode ? countryCode.toUpperCase() : 'XX';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        color: '#111827',
        fontSize: Math.max(10, Math.floor(size / 2.8)),
        border: '1px solid #d1d5db',
      }}
      role="img"
      aria-label={`Flag ${display}`}
    >
      {display}
    </span>
  );
};
