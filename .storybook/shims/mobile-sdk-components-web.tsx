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
  return (
    <button
      type="button"
      onClick={onPress}
      style={{
        backgroundColor: bgColor,
        color,
        borderColor,
        borderWidth,
        borderStyle: borderWidth ? 'solid' : undefined,
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
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? '#ffffff' : '#000000',
        color: disabled ? '#64748b' : '#f59e0b',
        padding: 12,
        borderRadius: 8,
        border: '1px solid #000000',
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
  return (
    <button
      type="button"
      onClick={onPress}
      style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: 12,
        borderRadius: 8,
        border: '1px solid #000000',
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
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? '#e5e7eb' : '#111827',
        color: disabled ? '#9ca3af' : '#f59e0b',
        padding: 12,
        borderRadius: 8,
        border: '1px solid #111827',
      }}
    >
      {children}
    </button>
  );
};

export const HeldPrimaryButtonProveScreen: React.FC<{
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}> = ({ children, onPress, disabled }) => {
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? '#e5e7eb' : '#111827',
        color: disabled ? '#9ca3af' : '#f59e0b',
        padding: 12,
        borderRadius: 8,
        border: '1px solid #111827',
      }}
    >
      {children}
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
