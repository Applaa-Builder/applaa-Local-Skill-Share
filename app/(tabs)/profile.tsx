import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Switch
} from "react-native";
import { useRouter } from "expo-router";
import { 
  Settings, 
  LogOut, 
  Edit, 
  Star, 
  Award, 
  Clock, 
  MapPin,
  ChevronRight
} from "lucide-react-native";
import Colors from "@/constants/colors";
import { useAuthStore } from "../_layout";

// Mock user data
const user = {
  id: "current-user",
  name: "Jamie Smith",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
  bio: "Passionate about music, cooking, and teaching others. Always eager to learn new skills!",
  location: "Seattle, WA",
  memberSince: "March 2025",
  rating: 4.9,
  reviews: 18,
  skills: [
    { id: "s1", name: "Piano Teaching", level: "Expert", isOffering: true },
    { id: "s2", name: "Web Development", level: "Expert", isOffering: true },
    { id: "s3", name: "Spanish", level: "Intermediate", isOffering: false },
    { id: "s4", name: "Photography", level: "Beginner", isOffering: false },
  ],
  availability: {
    monday: ["evening"],
    wednesday: ["afternoon", "evening"],
    friday: ["morning"],
    saturday: ["afternoon"],
    sunday: ["morning", "afternoon"],
  },
  completedSessions: 24,
};

export default function ProfileScreen() {
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("offering");

  const filteredSkills = user.skills.filter(skill => 
    activeTab === "all" || 
    (activeTab === "offering" && skill.isOffering) || 
    (activeTab === "learning" && !skill.isOffering)
  );

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleLogout = () => {
    logout();
    router.replace("/onboarding");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with profile info */}
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
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
        </View>
        
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Edit size={16} color="#FFFFFF" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityLabel}>Available for bookings</Text>
            <Switch
              value={isAvailable}
              onValueChange={setIsAvailable}
              trackColor={{ false: Colors.light.border, true: Colors.light.tint }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>

      {/* Bio section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>

      {/* Stats section */}
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
          <Clock size={24} color={Colors.light.tint} />
          <Text style={styles.statValue}>{user.memberSince}</Text>
          <Text style={styles.statLabel}>Member Since</Text>
        </View>
      </View>

      {/* Skills section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Skills</Text>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "offering" && styles.activeTab]}
            onPress={() => setActiveTab("offering")}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === "offering" && styles.activeTabText
              ]}
            >
              Offering
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "learning" && styles.activeTab]}
            onPress={() => setActiveTab("learning")}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === "learning" && styles.activeTabText
              ]}
            >
              Learning
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
        
        <View style={styles.skillsList}>
          {filteredSkills.map(skill => (
            <View key={skill.id} style={styles.skillItem}>
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
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.addSkillButton}
            onPress={() => router.push("/profile/add-skill")}
          >
            <Text style={styles.addSkillText}>+ Add New Skill</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Availability section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Availability</Text>
        <TouchableOpacity 
          style={styles.availabilityButton}
          onPress={() => router.push("/profile/availability")}
        >
          <Text style={styles.availabilityButtonText}>Manage Availability</Text>
          <ChevronRight size={20} color={Colors.light.tint} />
        </TouchableOpacity>
        
        <View style={styles.availabilityList}>
          {Object.entries(user.availability).map(([day, times]) => (
            <View key={day} style={styles.availabilityItem}>
              <Text style={styles.dayName}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
              <View style={styles.timesContainer}>
                {times.map(time => (
                  <View key={time} style={styles.timeChip}>
                    <Text style={styles.timeText}>
                      {time.charAt(0).toUpperCase() + time.slice(1)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Settings and Logout */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
          <Settings size={20} color={Colors.light.text} />
          <Text style={styles.menuItemText}>Settings</Text>
          <ChevronRight size={20} color={Colors.light.muted} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <LogOut size={20} color={Colors.light.error} />
          <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
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
  header: {
    padding: 16,
    backgroundColor: Colors.light.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.light.text,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
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
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: Colors.light.tint,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    marginLeft: 8,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityLabel: {
    fontSize: 14,
    color: Colors.light.text,
    marginRight: 8,
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
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 16,
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
  skillsList: {
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
  addSkillButton: {
    marginTop: 16,
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 8,
    borderStyle: "dashed",
  },
  addSkillText: {
    color: Colors.light.tint,
    fontWeight: "500",
  },
  availabilityButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  availabilityButtonText: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: "500",
  },
  availabilityList: {
    marginBottom: 8,
  },
  availabilityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  dayName: {
    width: 100,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
  },
  timesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeChip: {
    backgroundColor: Colors.light.card,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 12,
    color: Colors.light.text,
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: Colors.light.text,
  },
  logoutText: {
    color: Colors.light.error,
  },
});