import type React from 'react';
import { StyleSheet, Text, type TextStyle, TouchableOpacity, type ViewStyle } from 'react-native';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
}) => {
  const buttonStyle: ViewStyle[] = [
    styles.button,
    primary ? styles.button_primary : styles.button_secondary,
    styles[`button_${size}` as keyof typeof styles] as ViewStyle,
    backgroundColor && { backgroundColor },
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.text,
    primary ? styles.text_primary : styles.text_secondary,
    styles[`text_${size}` as keyof typeof styles] as TextStyle,
  ].filter(Boolean);

  return (
    <TouchableOpacity style={buttonStyle} onPress={onClick} activeOpacity={0.7}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
  },
  button_primary: {
    backgroundColor: '#1ea7fd',
  },
  button_secondary: {
    backgroundColor: 'transparent',
    shadowColor: '#00000026',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 1,
    borderColor: '#00000026',
  },
  button_small: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  button_medium: {
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  button_large: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  text: {
    fontWeight: '700',
    lineHeight: 1,
    fontFamily: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  text_primary: {
    color: 'white',
  },
  text_secondary: {
    color: '#333',
  },
  text_small: {
    fontSize: 12,
  },
  text_medium: {
    fontSize: 14,
  },
  text_large: {
    fontSize: 16,
  },
});
