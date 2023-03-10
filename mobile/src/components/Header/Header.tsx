import React from "react";
import { StyleSheet, View } from "react-native";

import Icon from "@components/Icon";
import CustomText from "@components/CustomText";

import { HeaderProps } from "./header.props";
import { SearchIcon } from "@assets/svg/icons";

const Header: React.FC<HeaderProps> = React.memo((props) => {
  const { title, icon, searching, onPress } = props;

  return (
    <View style={[styles.header, searching && { justifyContent: "space-between" }]}>
      <View style={{ flexDirection: "row", alignItems: "center", maxWidth: "70%" }}>
        {icon ? (
          <Icon onPress={onPress} icon={icon} size={20} style={styles.icon} />
        ) : null}
        <CustomText numberOfLines={1} content={title} type="h3" color="text" />
      </View>
      {searching && <SearchIcon />}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    marginEnd: 16,
  },
});

export default Header;
