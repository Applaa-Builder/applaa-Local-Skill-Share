import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  FlatList
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  Star, 
  MapPin, 
  Award, 
  MessageCircle,
  Calendar
} from "lucide-react-native";
import Colors from "@/constants/colors";

// Mock data for users
const users = [
  {
    id: "u1",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    bio: "Professional guitarist with 10+ years of experience. I love teaching beginners and helping them discover the joy of music. Patient and encouraging teaching style.",
    location: "Downtown, Seattle",
    memberSince: "January 2025",
    rating: 4.8,
    reviews: 24,
    skills: [
      { id: "s1", name: "Guitar", level: "Expert", isOffering: true },
      { id: "s2", name: "Music Theory", level: "Expert", isOffering: true },
      { id: "s3", name: "Piano", level: "Intermediate", isOffering: false },
    ],
    completedSessions: 42,
    offerings: [
      {
        id: "1",
        title: "Guitar Lessons for Beginners",
        price: 25,
        image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8fDB8fHww"
      }
    ],
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
    id: "u2",
    name: "Maria Romano",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    bio: "Passionate chef specializing in Italian cuisine. I grew up cooking with my grandmother in Sicily and love sharing authentic recipes and techniques. Let's create delicious meals together!",
    location: "Eastside, Seattle",
    memberSince: "February 2025",
    rating: 4.9,
    reviews: 36,
    skills: [
      { id: "s4", name: "Italian Cooking", level: "Expert", isOffering: true },
      { id: "s5", name: "Pasta Making", level: "Expert", isOffering: true },
      { id: "s6", name: "French Cuisine", level: "Beginner", isOffering: false },
    ],
    completedSessions: 58,
    offerings: [
      {
        id: "2",
        title: "Italian Cooking Masterclass",
        price: 40,
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZ3xlbnwwfHwwfHx8MA%3D%3D"
      }
    ],
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
    id: "u3",
    name: "Carlos Vega",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    bio: "Native Spanish speaker from Madrid with a passion for language exchange. I believe conversation is the best way to learn a language. Let's practice Spanish in a relaxed, fun environment!",
    location: "University District, Seattle",
    memberSince: "March 2025",
    rating: 4.7,
    reviews: 19,
    skills: [
      { id: "s7", name: "Spanish", level: "Native", isOffering: true },
      { id: "s8", name: "English", level: "Fluent", isOffering: true },
      { id: "s9", name: "French", level: "Intermediate", isOffering: false },
    ],
    completedSessions: 31,
    offerings: [
      {
        id: "3",
        title: "Spanish Conversation Practice",
        price: 20,
        image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BhbmlzaHxlbnwwfHwwfHx8MA%3D%3D"
      }
    ],
    reviews: []
  },
  {
    id: "u4",
    name: "Emma Chen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    bio: "Certified yoga instructor with a focus on mindfulness and alignment. My classes are suitable for all levels, with modifications offered for beginners. I create a welcoming space for everyone to explore yoga at their own pace.",
    location: "Parkside, Seattle",
    memberSince: "December 2024",
    rating: 4.9,
    reviews: 42,
    skills: [
      { id: "s10", name: "Yoga", level: "Expert", isOffering: true },
      { id: "s11", name: "Meditation", level: "Advanced", isOffering: true },
      { id: "s12", name: "Photography", level: "Intermediate", isOffering: false },
    ],
    completedSessions: 76,
    offerings: [
      {
        id: "4",
        title: "Yoga for Beginners",
        price: 15,
        image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D"
      }
    ],
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
      }
    ]
  },
];

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  const handleSkillPress = (skillId: string) => {
    // In a real app, this would navigate to a skill detail page
    // or filter the discover page by this skill
    router.push("/");
  };

  const handleOfferingPress = (offeringId: string) => {
    router.push(`/skill/${offeringId}`);
  };

  const handleMessagePress = () => {
    // Create a new conversation or navigate to existing one
    router.push(`/conversation/new?providerId=${user.id}`);
  };

  const handleBookPress = () => {
    if (user.offerings.length > 0) {
      router.push(`/skill/${user.offerings[0].id}`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.rating}>{user.rating} ({user.reviews} reviews)</Text>
        </View>
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Colors.light.muted} />
          <Text style={styles.location}>{user.location}</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Award size={24} color={Colors.light.tint} />
          <Text style={styles.statValue}>{user.completedSessions}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        <View style={styles.statItem}>
          <Star size={24} color={Colors.light.tint} />
          <Text style={styles.statValue}>{user.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Calendar size={24} color={Colors.light.tint} />
          <Text style={styles.statValue}>{user.memberSince}</Text>
          <Text style={styles.statLabel}>Member Since</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {user.skills.map((skill) => (
            <TouchableOpacity
              key={skill.id}
              style={styles.skillItem}
              onPress={() => handleSkillPress(skill.id)}
            >
              <View>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillLevel}>{skill.level}</Text>
              </View>
              <View style={[
                styles.skillBadge, 
                skill.isOffering ? styles.offeringBadge : styles.learningBadge
              ]}>
                <Text style={styles.skillBadgeText}>
                  {skill.isOffering ? "Offering" : "Learning"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {user.offerings.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Offerings</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offeringsContainer}
          >
            {user.offerings.map((offering) => (
              <TouchableOpacity
                key={offering.id}
                style={styles.offeringCard}
                onPress={() => handleOfferingPress(offering.id)}
              >
                <Image source={{ uri: offering.image }} style={styles.offeringImage} />
                <View style={styles.offeringContent}>
                  <Text style={styles.offeringTitle}>{offering.title}</Text>
                  <View style={styles.offeringPrice}>
                    <Text style={styles.offeringPriceText}>${offering.price}/hr</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {user.reviews.length > 0 && (
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {user.reviews.length > 2 && (
              <TouchableOpacity onPress={() => router.push(`/reviews/user/${user.id}`)}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {user.reviews.slice(0, 2).map((review) => (
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
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={handleMessagePress}
        >
          <MessageCircle size={20} color="#FFFFFF" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        
        {user.offerings.length > 0 && (
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={handleBookPress}
          >
            <Text style={styles.bookButtonText}>Book a Session</Text>
          </TouchableOpacity>
        )}
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
  header: {
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.light.text,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: Colors.light.muted,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.light.muted,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.light.text,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  skillsContainer: {
    marginBottom: 8,
  },
  skillItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  skillName: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
    marginBottom: 4,
  },
  skillLevel: {
    fontSize: 14,
    color: Colors.light.muted,
  },
  skillBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  offeringBadge: {
    backgroundColor: Colors.light.tint + "20", // 20% opacity
  },
  learningBadge: {
    backgroundColor: Colors.light.secondary + "20", // 20% opacity
  },
  skillBadgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  offeringsContainer: {
    paddingBottom: 8,
  },
  offeringCard: {
    width: 200,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.light.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  offeringImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  offeringContent: {
    padding: 12,
  },
  offeringTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: Colors.light.text,
  },
  offeringPrice: {
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  offeringPriceText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.text,
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
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  messageButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
  },
  bookButton: {
    flex: 1,
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});