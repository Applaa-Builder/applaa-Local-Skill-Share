import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Pressable
} from "react-native";
import { useRouter } from "expo-router";
import { Calendar, Clock, MapPin } from "lucide-react-native";
import Colors from "@/constants/colors";

// Mock data for bookings
const bookings = [
  {
    id: "b1",
    status: "upcoming",
    date: "June 22, 2025",
    time: "3:00 PM - 4:00 PM",
    skill: {
      id: "s1",
      title: "Guitar Lessons for Beginners",
      image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8fDB8fHww"
    },
    provider: {
      id: "u1",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    location: "Downtown Music Studio",
    isTeaching: false
  },
  {
    id: "b2",
    status: "upcoming",
    date: "June 25, 2025",
    time: "5:30 PM - 7:00 PM",
    skill: {
      id: "s2",
      title: "Spanish Conversation Practice",
      image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BhbmlzaHxlbnwwfHwwfHx8MA%3D%3D"
    },
    provider: {
      id: "u3",
      name: "Carlos Vega",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    location: "Local Coffee Shop",
    isTeaching: false
  },
  {
    id: "b3",
    status: "past",
    date: "June 15, 2025",
    time: "10:00 AM - 11:30 AM",
    skill: {
      id: "s3",
      title: "Photography Basics",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww"
    },
    provider: {
      id: "u4",
      name: "Emma Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    location: "City Park",
    isTeaching: false,
    hasReviewed: false
  },
  {
    id: "b4",
    status: "upcoming",
    date: "June 24, 2025",
    time: "6:00 PM - 7:30 PM",
    skill: {
      id: "s4",
      title: "Web Development Tutoring",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww"
    },
    student: {
      id: "u5",
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    location: "Online (Zoom)",
    isTeaching: true
  },
];

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const filteredBookings = bookings.filter(booking => 
    activeTab === "all" || booking.status === activeTab
  );

  const handleBookingPress = (bookingId: string) => {
    router.push(`/booking/${bookingId}`);
  };

  const renderBookingItem = ({ item }: { item: typeof bookings[0] }) => {
    const isPast = item.status === "past";
    const person = item.isTeaching ? item.student : item.provider;

    return (
      <Pressable 
        style={styles.bookingCard}
        onPress={() => handleBookingPress(item.id)}
      >
        <Image source={{ uri: item.skill.image }} style={styles.skillImage} />
        <View style={styles.bookingContent}>
          <Text style={styles.skillTitle}>{item.skill.title}</Text>
          
          <View style={styles.infoRow}>
            <Calendar size={16} color={Colors.light.muted} style={styles.infoIcon} />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={16} color={Colors.light.muted} style={styles.infoIcon} />
            <Text style={styles.infoText}>{item.time}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MapPin size={16} color={Colors.light.muted} style={styles.infoIcon} />
            <Text style={styles.infoText}>{item.location}</Text>
          </View>
          
          <View style={styles.personRow}>
            <Image source={{ uri: person.avatar }} style={styles.personAvatar} />
            <Text style={styles.personText}>
              {item.isTeaching ? "Teaching" : "Learning from"} {person.name}
            </Text>
          </View>
          
          {isPast && !item.hasReviewed && (
            <TouchableOpacity 
              style={styles.reviewButton}
              onPress={() => router.push(`/review/${item.id}`)}
            >
              <Text style={styles.reviewButtonText}>Leave a Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === "upcoming" && styles.activeTabText
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.activeTab]}
          onPress={() => setActiveTab("past")}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === "past" && styles.activeTabText
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.activeTab]}
          onPress={() => setActiveTab("all")}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === "all" && styles.activeTabText
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
      </View>

      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.bookingsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No {activeTab} bookings</Text>
          <Text style={styles.emptyStateText}>
            {activeTab === "upcoming" 
              ? "You don't have any upcoming sessions. Browse skills to book a session!"
              : "You don't have any past sessions yet."}
          </Text>
          {activeTab === "upcoming" && (
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.push("/")}
            >
              <Text style={styles.browseButtonText}>Browse Skills</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.light.tint,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  bookingsList: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  skillImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  bookingContent: {
    padding: 16,
  },
  skillTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.light.text,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  personAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  personText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  reviewButton: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  reviewButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.light.text,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.muted,
    textAlign: "center",
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});