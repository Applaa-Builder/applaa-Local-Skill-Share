import React, { useState, useRef, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Send } from "lucide-react-native";
import Colors from "@/constants/colors";

// Mock data for conversations
const conversations = [
  {
    id: "c1",
    user: {
      id: "u1",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    messages: [
      {
        id: "m1",
        text: "Hi there! I'm interested in your guitar lessons. Do you have any availability next week?",
        timestamp: "10:30 AM",
        sender: "me",
      },
      {
        id: "m2",
        text: "Hello! Yes, I have slots available on Tuesday and Thursday afternoons. Would either of those work for you?",
        timestamp: "10:35 AM",
        sender: "other",
      },
      {
        id: "m3",
        text: "Thursday afternoon would be perfect! What time?",
        timestamp: "10:38 AM",
        sender: "me",
      },
      {
        id: "m4",
        text: "Great! I have 3:00 PM or 5:00 PM available on Thursday. Which would you prefer?",
        timestamp: "10:40 AM",
        sender: "other",
      },
      {
        id: "m5",
        text: "3:00 PM works for me. Is there anything I should bring or prepare before the lesson?",
        timestamp: "10:42 AM",
        sender: "me",
      },
      {
        id: "m6",
        text: "Perfect! 3:00 PM on Thursday it is. If you have your own guitar, please bring it. Otherwise, I can provide one for the lesson. No other preparation needed - just come with enthusiasm!",
        timestamp: "10:45 AM",
        sender: "other",
      },
      {
        id: "m7",
        text: "I have a guitar, so I'll bring it. Looking forward to our lesson!",
        timestamp: "10:47 AM",
        sender: "me",
      },
      {
        id: "m8",
        text: "Looking forward to it too! See you on Thursday at 3:00 PM.",
        timestamp: "10:50 AM",
        sender: "other",
      },
    ]
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "Maria Romano",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    messages: [
      {
        id: "m1",
        text: "Hi Maria, I'm interested in your Italian cooking class. Do you accommodate dietary restrictions?",
        timestamp: "Yesterday, 2:15 PM",
        sender: "me",
      },
      {
        id: "m2",
        text: "Ciao! Yes, I can definitely accommodate dietary restrictions. What specific restrictions do you have?",
        timestamp: "Yesterday, 2:30 PM",
        sender: "other",
      },
      {
        id: "m3",
        text: "I'm vegetarian and have a nut allergy. Would that be a problem?",
        timestamp: "Yesterday, 2:35 PM",
        sender: "me",
      },
      {
        id: "m4",
        text: "Not a problem at all! Many Italian dishes are naturally vegetarian, and I can easily avoid nuts. I'll bring all the ingredients for our cooking session.",
        timestamp: "Yesterday, 2:40 PM",
        sender: "other",
      },
      {
        id: "m5",
        text: "That sounds great! When is your next available session?",
        timestamp: "Yesterday, 2:45 PM",
        sender: "me",
      },
    ]
  },
];

export default function ConversationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  
  const conversation = conversations.find(c => c.id === id);
  
  if (!conversation) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Conversation not found</Text>
      </View>
    );
  }

  const handleSend = () => {
    if (message.trim() === "") return;
    
    // In a real app, this would send the message to the backend
    // and then update the local state with the new message
    
    // For now, we'll just clear the input
    setMessage("");
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    // Set the header title to the user's name
    router.setParams({ title: conversation.user.name });
  }, [conversation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <Stack.Screen 
        options={{ 
          title: conversation.user.name,
          headerTitleStyle: { fontSize: 18 },
          headerBackTitle: "Messages"
        }} 
      />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
      >
        {conversation.messages.map((msg) => (
          <View 
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === "me" ? styles.myMessage : styles.theirMessage
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.messageTimestamp}>{msg.timestamp}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            message.trim() === "" && styles.disabledSendButton
          ]}
          onPress={handleSend}
          disabled={message.trim() === ""}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.light.tint,
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.light.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: (props) => props.style?.includes(styles.myMessage) ? "#FFFFFF" : Colors.light.text,
  },
  messageTimestamp: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: "flex-end",
    color: (props) => props.style?.includes(styles.myMessage) ? "rgba(255,255,255,0.7)" : Colors.light.muted,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: Colors.light.background,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  disabledSendButton: {
    backgroundColor: Colors.light.muted,
  },
});