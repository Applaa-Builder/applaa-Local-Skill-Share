import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Image,
  Pressable
} from "react-native";
import { useRouter } from "expo-router";
import { Search, MapPin, Star } from "lucide-react-native";
import Colors from "@/constants/colors";

// Mock data for categories
const categories = [
  { id: "1", name: "Music", icon: "🎸" },
  { id: "2", name: "Cooking", icon: "🍳" },
  { id: "3", name: "Languages", icon: "🗣️" },
  { id: "4", name: "Fitness", icon: "💪" },
  { id: "5", name: "Art", icon: "🎨" },
  { id: "6", name: "Technology", icon: "💻" },
  { id: "7", name: "Crafts", icon: "🧶" },
  { id: "8", name: "Photography", icon: "📷" },
];

// Mock data for skills
const skills = [
  {
    id: "1",
    title: "Guitar Lessons for Beginners",
    category: "Music",
    provider: {
      id: "u1",
      name: "Alex Johnson",
      rating: 4.8,
      reviews: 24,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    price: 25,
    location: "Downtown",
    distance: "1.2 miles",
    image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8fDB8fHww"
  },
  {
    id: "2",
    title: "Italian Cooking Masterclass",
    category: "Cooking",
    provider: {
      id: "u2",
      name: "Maria Romano",
      rating: 4.9,
      reviews: 36,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    price: 40,
    location: "Eastside",
    distance: "2.5 miles",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "3",
    title: "Spanish Conversation Practice",
    category: "Languages",
    provider: {
      id: "u3",
      name: "Carlos Vega",
      rating: 4.7,
      reviews: 19,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    price: 20,
    location: "University District",
    distance: "0.8 miles",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BhbmlzaHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "4",
    title: "Yoga for Beginners",
    category: "Fitness",
    provider: {
      id: "u4",
      name: "Emma Chen",
      rating: 4.9,
      reviews: 42,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    price: 15,
    location: "Parkside",
    distance: "1.5 miles",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D"
  },
];

export default function DiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = searchQuery === "" || 
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      skill.category === categories.find(cat => cat.id === selectedCategory)?.name;
    
    return matchesSearch && matchesCategory;
  });

  const handleSkillPress = (skillId: string) => {
    router.push(`/skill/${skillId}`);
  };

  const handleProviderPress = (providerId: string) => {
    router.push(`/profile/${providerId}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={Colors.light.muted} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search skills, categories, or teachers"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.light.tint} />
            <Text style={styles.locationText}>Seattle, WA</Text>
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.selectedCategory
              ]}
              onPress={() => {
                setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                );
              }}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text 
                style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Skills */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Featured Skills</Text>
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <Pressable 
                key={skill.id} 
                style={styles.skillCard}
                onPress={() => handleSkillPress(skill.id)}
              >
                <Image source={{ uri: skill.image }} style={styles.skillImage} />
                <View style={styles.skillContent}>
                  <View style={styles.skillHeader}>
                    <Text style={styles.skillCategory}>{skill.category}</Text>
                    <View style={styles.priceTag}>
                      <Text style={styles.priceText}>${skill.price}/hr</Text>
                    </View>
                  </View>
                  <Text style={styles.skillTitle}>{skill.title}</Text>
                  <Pressable 
                    style={styles.providerRow}
                    onPress={() => handleProviderPress(skill.provider.id)}
                  >
                    <Image source={{ uri: skill.provider.avatar }} style={styles.providerAvatar} />
                    <View style={styles.providerInfo}>
                      <Text style={styles.providerName}>{skill.provider.name}</Text>
                      <View style={styles.ratingContainer}>
                        <Star size={14} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.ratingText}>
                          {skill.provider.rating} ({skill.provider.reviews})
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                  <View style={styles.locationRow}>
                    <MapPin size={14} color={Colors.light.muted} />
                    <Text style={styles.locationInfo}>
                      {skill.location} • {skill.distance}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No skills found matching your search</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    color: Colors.light.text,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 80,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategory: {
    backgroundColor: Colors.light.tint,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.light.text,
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  skillsSection: {
    paddingBottom: 24,
  },
  skillCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    marginHorizontal: 16,
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
    height: 160,
    resizeMode: "cover",
  },
  skillContent: {
    padding: 16,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  skillCategory: {
    fontSize: 14,
    color: Colors.light.muted,
    fontWeight: "500",
  },
  priceTag: {
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  skillTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.light.text,
  },
  providerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  providerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: Colors.light.muted,
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationInfo: {
    fontSize: 12,
    color: Colors.light.muted,
    marginLeft: 4,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.muted,
    textAlign: "center",
  },
});