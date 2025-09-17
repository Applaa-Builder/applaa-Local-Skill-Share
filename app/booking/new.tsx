import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  MessageSquare,
  Check
} from "lucide-react-native";
import Colors from "@/constants/colors";

// Mock data for skills
const skills = [
  {
    id: "1",
    title: "Guitar Lessons for Beginners",
    category: "Music",
    provider: {
      id: "u1",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    price: 25,
    location: "Downtown Music Studio",
    duration: "60 minutes",
    image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8fDB8fHww"
  },
  {
    id: "2",
    title: "Italian Cooking Masterclass",
    category: "Cooking",
    provider: {
      id: "u2",
      name: "Maria Romano",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    price: 40,
    location: "Eastside Culinary Studio",
    duration: "90 minutes",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "3",
    title: "Spanish Conversation Practice",
    category: "Languages",
    provider: {
      id: "u3",
      name: "Carlos Vega",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    price: 20,
    location: "University District Café",
    duration: "45 minutes",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BhbmlzaHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "4",
    title: "Yoga for Beginners",
    category: "Fitness",
    provider: {
      id: "u4",
      name: "Emma Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    price: 15,
    location: "Parkside Yoga Studio",
    duration: "60 minutes",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D"
  },
];

// Payment methods mock data
const paymentMethods = [
  { id: "pm1", type: "card", last4: "4242", brand: "Visa" },
  { id: "pm2", type: "card", last4: "1234", brand: "Mastercard" },
];

export default function BookingScreen() {
  const { skillId, day, time } = useLocalSearchParams();
  const router = useRouter();
  
  const skill = skills.find(s => s.id === skillId);
  
  const [notes, setNotes] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);
  
  if (!skill) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Skill not found</Text>
      </View>
    );
  }

  const handleConfirmBooking = () => {
    // In a real app, this would make an API call to create the booking
    Alert.alert(
      "Booking Confirmed",
      `Your session with ${skill.provider.name} has been booked for ${day}, ${time}.`,
      [
        { 
          text: "OK", 
          onPress: () => router.replace("/bookings") 
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.skillCard}>
          <Image source={{ uri: skill.image }} style={styles.skillImage} />
          <View style={styles.skillInfo}>
            <Text style={styles.skillTitle}>{skill.title}</Text>
            <Text style={styles.skillCategory}>{skill.category}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Details</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Calendar size={18} color={Colors.light.muted} style={styles.detailIcon} />
              <Text style={styles.detailText}>{day}</Text>
            </View>
            <View style={styles.detailRow}>
              <Clock size={18} color={Colors.light.muted} style={styles.detailIcon} />
              <Text style={styles.detailText}>{time} ({skill.duration})</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={18} color={Colors.light.muted} style={styles.detailIcon} />
              <Text style={styles.detailText}>{skill.location}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Provider</Text>
          <View style={styles.providerCard}>
            <Image source={{ uri: skill.provider.avatar }} style={styles.providerAvatar} />
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{skill.provider.name}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes for Provider</Text>
          <View style={styles.notesContainer}>
            <MessageSquare size={18} color={Colors.light.muted} style={styles.notesIcon} />
            <TextInput
              style={styles.notesInput}
              placeholder="Any special requests or information for the provider?"
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodItem,
                selectedPaymentMethod === method.id && styles.selectedPaymentMethod
              ]}
              onPress={() => setSelectedPaymentMethod(method.id)}
            >
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodBrand}>{method.brand}</Text>
                <Text style={styles.paymentMethodDetails}>•••• {method.last4}</Text>
              </View>
              {selectedPaymentMethod === method.id && (
                <Check size={20} color={Colors.light.tint} />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addPaymentButton}>
            <Text style={styles.addPaymentText}>+ Add Payment Method</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Summary</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Session Fee</Text>
              <Text style={styles.priceValue}>${skill.price}.00</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Service Fee</Text>
              <Text style={styles.priceValue}>${(skill.price * 0.1).toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${(skill.price + skill.price * 0.1).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
        
        <Text style={styles.termsText}>
          By confirming, you agree to our Terms of Service and Cancellation Policy.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: Colors.light.text,
  },
  skillCard: {
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  skillImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  skillInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.light.text,
  },
  skillCategory: {
    fontSize: 14,
    color: Colors.light.muted,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.light.text,
  },
  detailsCard: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  providerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 12,
  },
  providerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  notesContainer: {
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 12,
    alignItems: "flex-start",
  },
  notesIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  notesInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    minHeight: 80,
  },
  paymentMethodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedPaymentMethod: {
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  paymentMethodInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentMethodBrand: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
    color: Colors.light.text,
  },
  paymentMethodDetails: {
    fontSize: 16,
    color: Colors.light.muted,
  },
  addPaymentButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 12,
    borderStyle: "dashed",
    alignItems: "center",
    marginTop: 8,
  },
  addPaymentText: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: "500",
  },
  priceCard: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: Colors.light.text,
  },
  priceValue: {
    fontSize: 16,
    color: Colors.light.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  confirmButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  termsText: {
    fontSize: 12,
    color: Colors.light.muted,
    textAlign: "center",
    marginBottom: 24,
  },
});