import React, { Dispatch, SetStateAction } from "react";
import { TextInput as Input, View } from "react-native";

import { Icons } from "@interfaces/icons";

import Icon from "@components/Icon";

import { styles } from "./textInput.styles";
import Button from "@components/Button";
import { useTheme, useThemedStyles } from "@hooks/index";

interface Props {
  placeholder: string;
  icon?: Icons;

  value: string | undefined;
  updateValue: Dispatch<SetStateAction<string | undefined>>;

  secureField?: boolean;
  isFieldSecure?: boolean;
  updateSecure?: () => void;
}

const TextInput: React.FC<Props> = (props) => {
  const {
    placeholder,
    icon,
    secureField = false,
    isFieldSecure,
    updateSecure,
    value,
    updateValue,
  } = props;

  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={style.inputContainer}>
      {icon && <Icon style={style.icon} name={icon} />}
      <Input
        placeholderTextColor={colors.inputSelection}
        placeholder={placeholder}
        autoCapitalize="none"
        clearTextOnFocus
        value={value}
        onChangeText={updateValue}
        secureTextEntry={isFieldSecure}
        style={[style.input, icon && { paddingHorizontal: 50 }]}
      />
      {secureField && (
        <Button type="opacity" onPress={updateSecure} style={style.secureIndicator}>
          <Icon name={isFieldSecure ? "eyeClosed" : "eyeOpen"} />
        </Button>
      )}
    </View>
  );
};

export default TextInput;
