import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import Colors from "@/constants/colors";
import { useRouter } from "expo-router";

export default function ModalScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      
      <Image 
        source={{ uri: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2tpbGxzfGVufDB8fDB8fHww" }} 
        style={styles.headerImage} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>About SkillSwap</Text>
        
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          SkillSwap connects people in local communities to share knowledge and learn from each other. 
          We believe everyone has valuable skills to share, and learning is more meaningful when it's personal.
        </Text>
        
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepContainer}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Create Your Profile</Text>
            <Text style={styles.stepDescription}>
              Share your skills, interests, and what you'd like to learn from others.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Discover Skills</Text>
            <Text style={styles.stepDescription}>
              Browse skills offered by people in your area and find what interests you.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Book Sessions</Text>
            <Text style={styles.stepDescription}>
              Schedule time with skill providers at a location that works for both of you.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Learn & Share</Text>
            <Text style={styles.stepDescription}>
              Attend your session, learn new skills, and share your knowledge with others.
            </Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Our Community Values</Text>
        <Text style={styles.paragraph}>
          • <Text style={styles.bold}>Respect:</Text> Treat everyone with kindness and consideration
        </Text>
        <Text style={styles.paragraph}>
          • <Text style={styles.bold}>Quality:</Text> Provide valuable, honest instruction
        </Text>
        <Text style={styles.paragraph}>
          • <Text style={styles.bold}>Safety:</Text> Meet in public places and respect personal boundaries
        </Text>
        <Text style={styles.paragraph}>
          • <Text style={styles.bold}>Growth:</Text> Embrace a mindset of continuous learning
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.dismiss()}
        >
          <Text style={styles.buttonText}>Start Exploring</Text>
        </TouchableOpacity>
        
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: Colors.light.text,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: Colors.light.text,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    marginBottom: 12,
  },
  bold: {
    fontWeight: "600",
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stepBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumber: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.light.text,
  },
  stepDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.muted,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.light.muted,
    fontSize: 12,
  },
});