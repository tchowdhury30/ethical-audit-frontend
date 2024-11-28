/* CITATION: To create this page, I used Chatgpt and a starter code from this repo: https://github.com/expo/fyi/blob/main/barcode-scanner-to-expo-camera.md */
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, ActivityIndicator, Image, TouchableOpacity, Platform } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import useStore from '../services/useStore';
import { useNavigation } from '@react-navigation/native';
import CompanyDetailScreen from "./company_detail";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCompanyByProductBarcode = useStore((state) => state.fetchCompanyByProductBarcode);
  const company = useStore((state) => state.currentScannedCompany);
  const resetCurrentScannedCompany = useStore((state) => state.resetCurrentScannedCompany);
  const navigation = useNavigation();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  useEffect(() => {
    if (barcode) {
      setLoading(true);
      fetchCompanyByProductBarcode(barcode).finally(() => setLoading(false));
    }
    else{
      handleScanAgain();
    }
  }, [barcode]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcode(data);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setBarcode(null);
    resetCurrentScannedCompany();
  };

  const handleNavigation = () => {
    navigation.navigate('CompanyDetail', { companyName: company.companyName });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {!scanned && !loading && (
          <CameraView
            onBarcodeScanned={handleBarCodeScanned}
            style={styles.camera}
          />
        )}
        {scanned && company && !loading && (
          <TouchableOpacity
            style={styles.companyInfoContainer}
            onPress={handleNavigation}
          >
            {(company.logoImage === 'https://media.giphy.com/media/UYBDCJjwOd9Re/giphy.gif' || !company.logoImage) ? (
                <Image
                    style={styles.companyImage}
                    source={require('../assets/images/placeholder.png')}
                    resizeMode="contain"
                />
            ) : (
                <Image
                    style={styles.logo}
                    source={{ uri: company.logoImage }}
                    resizeMode="contain"
                />
            )}
            <View style={styles.companyInfoText}>
              <Text style={styles.companyName}>{company.companyName}</Text>
              <Text style={styles.companyRating}>Overall Rating: {company.overallScore}</Text>
            </View>
            <View style={styles.helpIconContainer}>
              <Text style={styles.helpIcon}>?</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      {scanned && company && !loading && (
        <View style={styles.buttonContainer}>
          <Button title={"Tap to Scan Again"} onPress={handleScanAgain} />
        </View>      
      )}
      {scanned && !loading && !company && barcode && (
        <View style={styles.errorPopupContainer}>
          <TouchableOpacity onPress={handleScanAgain}>
            <Text style={styles.popupText}>
              No information was found about the manufacturer of this product.
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {scanned && !loading && !company && !barcode && (
        <View style={styles.errorPopupContainer}>
          <TouchableOpacity onPress={handleScanAgain}>
            <Text style={styles.popupText}>
              Something went wrong while scanning. Tap to Scan Again
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: "flex-start",
  },
  cameraContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    alignSelf: 'center',
    zIndex: 1,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 140,
    alignSelf: 'center',
  },
  companyInfoContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
  },
  companyImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  companyInfoText: {
    flex: 1,
    marginLeft: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyRating: {
    fontSize: 14,
    color: '#888',
  },
  helpIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#7A00E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorPopupContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7A00E6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  popupText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },  
});
