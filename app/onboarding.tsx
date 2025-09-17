import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  FlatList
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight, Check } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useAuthStore } from "./_layout";

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
  { id: "9", name: "Dance", icon: "💃" },
  { id: "10", name: "Writing", icon: "✍️" },
  { id: "11", name: "Business", icon: "📊" },
  { id: "12", name: "Design", icon: "🎭" },
];

// Mock data for skills
const skills = [
  { id: "s1", name: "Guitar", category: "1" },
  { id: "s2", name: "Piano", category: "1" },
  { id: "s3", name: "Singing", category: "1" },
  { id: "s4", name: "Italian Cuisine", category: "2" },
  { id: "s5", name: "Baking", category: "2" },
  { id: "s6", name: "Spanish", category: "3" },
  { id: "s7", name: "French", category: "3" },
  { id: "s8", name: "Mandarin", category: "3" },
  { id: "s9", name: "Yoga", category: "4" },
  { id: "s10", name: "HIIT Training", category: "4" },
  { id: "s11", name: "Painting", category: "5" },
  { id: "s12", name: "Drawing", category: "5" },
  { id: "s13", name: "Web Development", category: "6" },
  { id: "s14", name: "Mobile App Development", category: "6" },
  { id: "s15", name: "Data Science", category: "6" },
  { id: "s16", name: "Knitting", category: "7" },
  { id: "s17", name: "Pottery", category: "7" },
  { id: "s18", name: "Portrait Photography", category: "8" },
  { id: "s19", name: "Landscape Photography", category: "8" },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const login = useAuthStore(state => state.login);
  const completeOnboarding = useAuthStore(state => state.completeOnboarding);
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTeachCategories, setSelectedTeachCategories] = useState<string[]>([]);
  const [selectedLearnCategories, setSelectedLearnCategories] = useState<string[]>([]);
  const [selectedTeachSkills, setSelectedTeachSkills] = useState<string[]>([]);
  const [selectedLearnSkills, setSelectedLearnSkills] = useState<string[]>([]);
  
  const handleCategoryToggle = (categoryId: string, type: "teach" | "learn") => {
    if (type === "teach") {
      setSelectedTeachCategories(prev => 
        prev.includes(categoryId)
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    } else {
      setSelectedLearnCategories(prev => 
        prev.includes(categoryId)
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    }
  };
  
  const handleSkillToggle = (skillId: string, type: "teach" | "learn") => {
    if (type === "teach") {
      setSelectedTeachSkills(prev => 
        prev.includes(skillId)
          ? prev.filter(id => id !== skillId)
          : [...prev, skillId]
      );
    } else {
      setSelectedLearnSkills(prev => 
        prev.includes(skillId)
          ? prev.filter(id => id !== skillId)
          : [...prev, skillId]
      );
    }
  };
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      login("user-123");
      completeOnboarding();
      router.replace("/");
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !name || !bio || !location;
      case 2:
        return selectedTeachCategories.length === 0;
      case 3:
        return selectedLearnCategories.length === 0;
      case 4:
        return selectedTeachSkills.length === 0 || selectedLearnSkills.length === 0;
      default:
        return false;
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Tell us about yourself</Text>
            <Text style={styles.stepDescription}>
              This information helps others get to know you and find you on the platform.
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={[styles.textInput, styles.textAreaInput]}
                placeholder="Tell us a bit about yourself, your interests, and experience"
                multiline
                numberOfLines={4}
                value={bio}
                onChangeText={setBio}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="City, State"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>
        );
      
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What skills can you teach?</Text>
            <Text style={styles.stepDescription}>
              Select categories where you have expertise and would like to teach others.
            </Text>
            
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selectedTeachCategories.includes(category.id) && styles.selectedCategoryItem
                  ]}
                  onPress={() => handleCategoryToggle(category.id, "teach")}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text 
                    style={[
                      styles.categoryName,
                      selectedTeachCategories.includes(category.id) && styles.selectedCategoryText
                    ]}
                  >
                    {category.name}
                  </Text>
                  {selectedTeachCategories.includes(category.id) && (
                    <View style={styles.checkmarkBadge}>
                      <Check size={12} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What skills do you want to learn?</Text>
            <Text style={styles.stepDescription}>
              Select categories you're interested in learning from others.
            </Text>
            
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selectedLearnCategories.includes(category.id) && styles.selectedCategoryItem
                  ]}
                  onPress={() => handleCategoryToggle(category.id, "learn")}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text 
                    style={[
                      styles.categoryName,
                      selectedLearnCategories.includes(category.id) && styles.selectedCategoryText
                    ]}
                  >
                    {category.name}
                  </Text>
                  {selectedLearnCategories.includes(category.id) && (
                    <View style={styles.checkmarkBadge}>
                      <Check size={12} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      
      case 4:
        const teachSkills = skills.filter(skill => 
          selectedTeachCategories.includes(skill.category)
        );
        
        const learnSkills = skills.filter(skill => 
          selectedLearnCategories.includes(skill.category)
        );
        
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Select specific skills</Text>
            <Text style={styles.stepDescription}>
              Choose the specific skills you can teach and want to learn.
            </Text>
            
            <View style={styles.skillsSection}>
              <Text style={styles.skillsSectionTitle}>Skills to Teach</Text>
              <View style={styles.skillsGrid}>
                {teachSkills.map((skill) => (
                  <TouchableOpacity
                    key={skill.id}
                    style={[
                      styles.skillItem,
                      selectedTeachSkills.includes(skill.id) && styles.selectedSkillItem
                    ]}
                    onPress={() => handleSkillToggle(skill.id, "teach")}
                  >
                    <Text 
                      style={[
                        styles.skillName,
                        selectedTeachSkills.includes(skill.id) && styles.selectedSkillText
                      ]}
                    >
                      {skill.name}
                    </Text>
                    {selectedTeachSkills.includes(skill.id) && (
                      <Check size={16} color={Colors.light.tint} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.skillsSection}>
              <Text style={styles.skillsSectionTitle}>Skills to Learn</Text>
              <View style={styles.skillsGrid}>
                {learnSkills.map((skill) => (
                  <TouchableOpacity
                    key={skill.id}
                    style={[
                      styles.skillItem,
                      selectedLearnSkills.includes(skill.id) && styles.selectedSkillItem
                    ]}
                    onPress={() => handleSkillToggle(skill.id, "learn")}
                  >
                    <Text 
                      style={[
                        styles.skillName,
                        selectedLearnSkills.includes(skill.id) && styles.selectedSkillText
                      ]}
                    >
                      {skill.name}
                    </Text>
                    {selectedLearnSkills.includes(skill.id) && (
                      <Check size={16} color={Colors.light.secondary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHNraWxscyUyMGV4Y2hhbmdlfGVufDB8fDB8fHww" }} 
          style={styles.headerImage} 
        />
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SkillSwap</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4].map((stepNumber) => (
          <View 
            key={stepNumber}
            style={[
              styles.progressStep,
              stepNumber <= step && styles.activeProgressStep
            ]}
          />
        ))}
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>
      
      <View style={styles.footer}>
        {step > 1 && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            styles.nextButton,
            isNextDisabled() && styles.disabledButton
          ]}
          onPress={handleNext}
          disabled={isNextDisabled()}
        >
          <Text style={styles.nextButtonText}>
            {step === 4 ? "Complete" : "Next"}
          </Text>
          {!isNextDisabled() && step !== 4 && (
            <ChevronRight size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    height: 200,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
  },
  progressStep: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.border,
    marginHorizontal: 4,
  },
  activeProgressStep: {
    backgroundColor: Colors.light.tint,
    width: 20,
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: Colors.light.text,
  },
  stepDescription: {
    fontSize: 16,
    color: Colors.light.muted,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: Colors.light.text,
  },
  textInput: {
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.light.text,
  },
  textAreaInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  categoryItem: {
    width: "30%",
    margin: "1.66%",
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    position: "relative",
  },
  selectedCategoryItem: {
    backgroundColor: Colors.light.tint + "20", // 20% opacity
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.light.text,
  },
  selectedCategoryText: {
    color: Colors.light.tint,
    fontWeight: "500",
  },
  checkmarkBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: Colors.light.tint,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  skillsSection: {
    marginBottom: 24,
  },
  skillsSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.light.text,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    marginBottom: 8,
    width: "48%",
  },
  selectedSkillItem: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  skillName: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedSkillText: {
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "500",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: Colors.light.muted,
  },
  nextButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: 4,
  },
});