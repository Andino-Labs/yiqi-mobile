// TODO create event list page.
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { dummyEvents } from "@/data/data";

const EventCard = ({ event, onPress }: any) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: event.image }} style={styles.cardImage} />
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.8)"]}
      style={styles.cardGradient}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{event.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {event.description}
        </Text>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const EventList = () => {
  const navigation = useNavigation();
  const scrollY = new Animated.Value(0);

  const handleEventPress = (event: any) => {
    // navigation.navigate("Event", {
    //   eventId: event.id,
    //   eventTitle: event.title,
    // });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Featured Calendars</Text>
      <Text style={styles.headerSubtitle}>That We Love</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#000000", "#194952", "#000000", "#000000"]}
      locations={[0, 0.5, 0.75, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.FlatList
        data={dummyEvents}
        renderItem={({ item, index }) => {
          return (
            <EventCard event={item} onPress={() => handleEventPress(item)} />
          );
        }}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        decelerationRate="fast"
        snapToInterval={300}
        snapToAlignment="start"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    marginBottom: 15,
    paddingLeft: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#9a9a9a",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 300,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
    justifyContent: "flex-end",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ffffff",
  },
  cardDescription: {
    fontSize: 16,
    color: "#f0f0f0",
    marginBottom: 12,
  },
  subscribeButton: {
    backgroundColor: "#0069ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  subscribeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default EventList;
