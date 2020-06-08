import React from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { useDispatch } from "react-redux";

const AddProfileImageButton = () => {
  const dispatch = useDispatch();

  // getPhotoFromGallery(() => {
  //   CameraRoll.getPhotos({ first: 1000000, assetType: "Photos" })
  //     .then((r) => {
  //       // uploadProfileImage(dispatch, r.edges);
  //     })
  //     // .catch((err) => {});
  // });

  return (
    <View style={styles.container}>
      <TouchableHighlight
      // onPress={() => getPhotoFromGallery()}
      >
        <Image
          style={styles.image}
          source={require("../assets/images/add_profile_image_icon.png")}
        />
      </TouchableHighlight>
      {/* <ScrollView>
        {this.state.photos.map((p, i) => {
          return (
            <Image
              key={i}
              style={{
                width: 300,
                height: 100,
              }}
              source={{ uri: p.node.image.uri }}
            />
          );
        })}
      </ScrollView> */}
    </View>
  );
};

// const AddReceiptImageButton = () => {
//   return (
//     <View style={styles.container}>
//       <TouchableHighlight>
//         <Image source={require("../assets/images/add_receipt_icon.png")} />
//       </TouchableHighlight>
//     </View>
//   );
// };
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#f0f4f7",
    margin: 10,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0.25,
    },
    shadowColor: "#000000",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 60,
    marginRight: 15,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: "#000000",
  },
});
export { AddProfileImageButton };
