import { ImageSourcePropType, ViewStyle, TouchableOpacityProperties, TextStyle } from "react-native"
import { ButtonPresetNames } from "./button.presets"

export interface ButtonProps extends TouchableOpacityProperties {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * An optional style override useful for padding & margin.
   */
  textStyle?: TextStyle

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * The image source
   */
  imageSource?: ImageSourcePropType
}
