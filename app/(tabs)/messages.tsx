import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput
} from "react-native";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";
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
    lastMessage: {
      text: "Looking forward to our guitar lesson tomorrow!",
      timestamp: "10:30 AM",
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "Maria Romano",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    lastMessage: {
      text: "I'll bring all the ingredients for our cooking session",
      timestamp: "Yesterday",
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: "c3",
    user: {
      id: "u3",
      name: "Carlos Vega",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    lastMessage: {
      text: "¡Hola! ¿Cómo estás? Ready for our Spanish practice?",
      timestamp: "Yesterday",
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "c4",
    user: {
      id: "u4",
      name: "Emma Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
    },
    lastMessage: {
      text: "I really enjoyed our yoga session! Would you like to book another one?",
      timestamp: "Monday",
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "c5",
    user: {
      id: "u5",
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    lastMessage: {
      text: "Thanks for the web development help! I have a few more questions about JavaScript.",
      timestamp: "Sunday",
      isRead: false,
    },
    unreadCount: 1,
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationPress = (conversationId: string) => {
    router.push(`/conversation/${conversationId}`);
  };

  const renderConversationItem = ({ item }: { item: typeof conversations[0] }) => {
    return (
      <TouchableOpacity 
        style={styles.conversationItem}
        onPress={() => handleConversationPress(item.id)}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.timestamp}>{item.lastMessage.timestamp}</Text>
          </View>
          <Text 
            style={[
              styles.lastMessage,
              !item.lastMessage.isRead && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.lastMessage.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.light.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          renderItem={renderConversationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.conversationsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No conversations found</Text>
          <Text style={styles.emptyStateText}>
            {searchQuery 
              ? "No conversations match your search" 
              : "Start a conversation by booking a session or messaging a skill provider"}
          </Text>
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
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  conversationsList: {
    paddingVertical: 8,
  },
  conversationItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  unreadBadge: {
    position: "absolute",
    right: -2,
    top: -2,
    backgroundColor: Colors.light.secondary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  unreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  conversationContent: {
    flex: 1,
    justifyContent: "center",
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.muted,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.light.muted,
  },
  unreadMessage: {
    color: Colors.light.text,
    fontWeight: "500",
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
  },
});