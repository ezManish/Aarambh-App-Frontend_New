import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await axios.get("https://safety-login.onrender.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
    } catch (err) {
      console.log("❌ Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>Failed to load profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Top Section */}
      <View style={styles.headerContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri:
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
            }}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>Registered User</Text>
      </View>

      {/* Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>User ID</Text>
          <Text style={styles.value}>{user.id}</Text>
        </View>
      </View>
    </View>
  );
}

// -----------------------------
//         STYLES
// -----------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
  },

  headerContainer: {
    alignItems: "center",
    marginBottom: 25,
    marginTop: 15,
  },

  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 3,
    backgroundColor: "#f97316",
    shadowColor: "#f97316",
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 55,
    backgroundColor: "#1f2937",
  },

  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 12,
  },

  role: {
    color: "#f97316",
    fontSize: 14,
    marginTop: 2,
    fontWeight: "600",
  },

  card: {
    marginTop: 15,
    backgroundColor: "#0b1120",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
    shadowColor: "#1f2937",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },

  cardTitle: {
    color: "#e5e7eb",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  row: {
    marginBottom: 16,
  },

  label: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 4,
  },

  value: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#1f2937",
    marginVertical: 10,
  },
});
