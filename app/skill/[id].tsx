import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Pressable
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  DollarSign, 
  MessageCircle,
  ChevronRight
} from "lucide-react-native";
import Colors from "@/constants/colors";

// Mock data for skills
const skills = [
  {
    id: "1",
    title: "Guitar Lessons for Beginners",
    category: "Music",
    description: "Learn the basics of guitar playing in a fun and engaging environment. Perfect for absolute beginners who want to start their musical journey. We'll cover basic chords, strumming patterns, and simple songs to get you playing quickly.",
    provider: {
      id: "u1",
      name: "Alex Johnson",
      rating: 4.8,
      reviews: 24,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    price: 25,
    location: "Downtown Music Studio",
    distance: "1.2 miles",
    duration: "60 minutes",
    availability: [
      { day: "Monday", slots: ["3:00 PM", "5:00 PM", "7:00 PM"] },
      { day: "Wednesday", slots: ["4:00 PM", "6:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
    ],
    image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8fDB8fHww",
    reviews: [
      {
        id: "r1",
        user: {
          name: "Sarah M.",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fHww"
        },
        rating: 5,
        text: "Alex is an amazing teacher! Very patient and explains concepts clearly. I went from knowing nothing to playing my first song in just a few lessons.",
        date: "May 10, 2025"
      },
      {
        id: "r2",
        user: {
          name: "Michael T.",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0fGVufDB8fDB8fHww"
        },
        rating: 4,
        text: "Great lessons for beginners. Alex makes learning fun and adapts to your pace. Highly recommend!",
        date: "April 28, 2025"
      }
    ]
  },
  {
    id: "2",
    title: "Italian Cooking Masterclass",
    category: "Cooking",
    description: "Learn authentic Italian cooking techniques from a passionate chef. We'll prepare delicious pasta dishes, sauces, and desserts using traditional recipes and fresh ingredients. By the end of the session, you'll be able to recreate these dishes at home.",
    provider: {
      id: "u2",
      name: "Maria Romano",
      rating: 4.9,
      reviews: 36,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    price: 40,
    location: "Eastside Culinary Studio",
    distance: "2.5 miles",
    duration: "90 minutes",
    availability: [
      { day: "Tuesday", slots: ["6:00 PM", "8:00 PM"] },
      { day: "Thursday", slots: ["6:00 PM", "8:00 PM"] },
      { day: "Sunday", slots: ["11:00 AM", "2:00 PM"] },
    ],
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZ3xlbnwwfHwwfHx8MA%3D%3D",
    reviews: [
      {
        id: "r3",
        user: {
          name: "David L.",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
        },
        rating: 5,
        text: "Maria's cooking class was incredible! She's so knowledgeable about Italian cuisine and makes the process fun and approachable. The pasta we made was better than restaurant quality!",
        date: "May 15, 2025"
      }
    ]
  },
  {
    id: "3",
    title: "Spanish Conversation Practice",
    category: "Languages",
    description: "Practice your Spanish speaking skills with a native speaker in a relaxed, conversational setting. We'll focus on practical vocabulary, pronunciation, and building confidence in real-world scenarios. All levels welcome, from beginners to advanced speakers looking to maintain fluency.",
    provider: {
      id: "u3",
      name: "Carlos Vega",
      rating: 4.7,
      reviews: 19,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    price: 20,
    location: "University District Café",
    distance: "0.8 miles",
    duration: "45 minutes",
    availability: [
      { day: "Monday", slots: ["4:00 PM", "5:00 PM", "6:00 PM"] },
      { day: "Wednesday", slots: ["4:00 PM", "5:00 PM", "6:00 PM"] },
      { day: "Friday", slots: ["3:00 PM", "4:00 PM", "5:00 PM"] },
    ],
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BhbmlzaHxlbnwwfHwwfHx8MA%3D%3D",
    reviews: []
  },
  {
    id: "4",
    title: "Yoga for Beginners",
    category: "Fitness",
    description: "A gentle introduction to yoga focusing on basic poses, proper alignment, and breathing techniques. This session is perfect for beginners or those returning to yoga after a break. We'll move at a comfortable pace and modifications will be offered for all poses.",
    provider: {
      id: "u4",
      name: "Emma Chen",
      rating: 4.9,
      reviews: 42,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    price: 15,
    location: "Parkside Yoga Studio",
    distance: "1.5 miles",
    duration: "60 minutes",
    availability: [
      { day: "Tuesday", slots: ["7:00 AM", "9:00 AM", "5:30 PM"] },
      { day: "Thursday", slots: ["7:00 AM", "9:00 AM", "5:30 PM"] },
      { day: "Saturday", slots: ["8:00 AM", "10:00 AM"] },
      { day: "Sunday", slots: ["9:00 AM", "11:00 AM"] },
    ],
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D",
    reviews: [
      {
        id: "r4",
        user: {
          name: "Jessica K.",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
        },
        rating: 5,
        text: "Emma is a wonderful yoga instructor! As a complete beginner, I felt comfortable and supported throughout the session. She explains everything clearly and offers modifications when needed.",
        date: "May 5, 2025"
      },
      {
        id: "r5",
        user: {
          name: "Robert P.",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
        },
        rating: 5,
        text: "Great session for beginners! Emma creates a peaceful atmosphere and is very attentive to form and alignment. I felt so much better after just one session.",
        date: "April 30, 2025"
      },
      {
        id: "r6",
        user: {
          name: "Aisha M.",
          avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
        },
        rating: 4,
        text: "Emma is patient and knowledgeable. The pace was perfect for a beginner like me. Looking forward to more sessions!",
        date: "April 22, 2025"
      }
    ]
  },
];

export default function SkillDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const skill = skills.find(s => s.id === id);
  
  if (!skill) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Skill not found</Text>
      </View>
    );
  }

  const handleProviderPress = () => {
    router.push(`/profile/${skill.provider.id}`);
  };

  const handleBookPress = () => {
    if (selectedDay && selectedTime) {
      router.push({
        pathname: "/booking/new",
        params: { 
          skillId: skill.id,
          day: selectedDay,
          time: selectedTime
        }
      });
    }
  };

  const handleMessagePress = () => {
    // Create a new conversation or navigate to existing one
    router.push(`/conversation/new?providerId=${skill.provider.id}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: skill.image }} style={styles.coverImage} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{skill.category}</Text>
          <View style={styles.priceTag}>
            <DollarSign size={16} color={Colors.light.text} />
            <Text style={styles.priceText}>${skill.price}/hr</Text>
          </View>
        </View>
        
        <Text style={styles.title}>{skill.title}</Text>
        
        <Pressable style={styles.providerCard} onPress={handleProviderPress}>
          <Image source={{ uri: skill.provider.avatar }} style={styles.providerAvatar} />
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{skill.provider.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>
                {skill.provider.rating} ({skill.provider.reviews} reviews)
              </Text>
            </View>
          </View>
          <ChevronRight size={20} color={Colors.light.muted} />
        </Pressable>
        
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <MapPin size={18} color={Colors.light.muted} style={styles.detailIcon} />
            <Text style={styles.detailText}>{skill.location} • {skill.distance}</Text>
          </View>
          <View style={styles.detailRow}>
            <Clock size={18} color={Colors.light.muted} style={styles.detailIcon} />
            <Text style={styles.detailText}>{skill.duration} per session</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{skill.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a Time</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysContainer}
          >
            {skill.availability.map((availDay) => (
              <TouchableOpacity
                key={availDay.day}
                style={[
                  styles.dayItem,
                  selectedDay === availDay.day && styles.selectedDay
                ]}
                onPress={() => {
                  setSelectedDay(availDay.day);
                  setSelectedTime(null);
                }}
              >
                <Text 
                  style={[
                    styles.dayText,
                    selectedDay === availDay.day && styles.selectedDayText
                  ]}
                >
                  {availDay.day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {selectedDay && (
            <View style={styles.timeSlotsContainer}>
              {skill.availability
                .find(a => a.day === selectedDay)?.slots
                .map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.selectedTimeSlot
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text 
                      style={[
                        styles.timeText,
                        selectedTime === time && styles.selectedTimeText
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          )}
        </View>
        
        {skill.reviews.length > 0 && (
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              {skill.reviews.length > 2 && (
                <TouchableOpacity onPress={() => router.push(`/reviews/${skill.id}`)}>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {skill.reviews.slice(0, 2).map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Image source={{ uri: review.user.avatar }} style={styles.reviewerAvatar} />
                  <View>
                    <Text style={styles.reviewerName}>{review.user.name}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <View style={styles.reviewRating}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={handleMessagePress}
        >
          <MessageCircle size={20} color={Colors.light.tint} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.bookButton,
            (!selectedDay || !selectedTime) && styles.disabledButton
          ]}
          onPress={handleBookPress}
          disabled={!selectedDay || !selectedTime}
        >
          <Text style={styles.bookButtonText}>
            {selectedDay && selectedTime 
              ? `Book for ${selectedDay}, ${selectedTime}` 
              : "Select day and time"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: Colors.light.text,
  },
  coverImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: Colors.light.muted,
    fontWeight: "500",
  },
  priceTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: Colors.light.text,
  },
  providerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
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
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: Colors.light.muted,
    marginLeft: 4,
  },
  detailsCard: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailText: {
    fontSize: 16,
    color: Colors.light.text,
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  daysContainer: {
    paddingBottom: 12,
  },
  dayItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
  },
  selectedDay: {
    backgroundColor: Colors.light.tint,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  selectedDayText: {
    color: "#FFFFFF",
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  timeSlot: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: Colors.light.card,
  },
  selectedTimeSlot: {
    backgroundColor: Colors.light.tint,
  },
  timeText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedTimeText: {
    color: "#FFFFFF",
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: "500",
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.light.muted,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
    color: Colors.light.text,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.text,
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: Colors.light.background,
  },
  messageButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    marginRight: 12,
  },
  bookButton: {
    flex: 1,
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
  },
  disabledButton: {
    backgroundColor: Colors.light.muted,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});