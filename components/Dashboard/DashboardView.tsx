import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

const DashboardView: React.FC = () => {
    return (
        <ScrollView className="flex-1 bg-gray-100 px-4">
            {/* Header */}
            <View className="flex-row justify-between items-center my-4">
                <Text className="text-2xl font-bold text-gray-900">YiQi</Text>
                {/* Default language switcher icon */}
                <Text>🌐</Text>
            </View>

            {/* Section: Create Experience */}
            <Text className="text-base text-gray-600 mb-4">
                Connect, celebrate, and create memories. Our platform makes it easy to
                discover and organize events that bring people together.
            </Text>
            <TouchableOpacity className="bg-blue-500 py-3 rounded-lg items-center my-4">
                <Text className="text-white font-bold text-base">Create your first event</Text>
            </TouchableOpacity>

            {/* Cards */}
            <View>
                <View className="bg-gray-200 p-4 rounded-lg my-2">
                    {/* Default calendar icon */}
                    <Text>📅</Text>
                    <Text className="text-lg font-bold text-gray-900 mb-1">Smart Scheduling</Text>
                    <Text className="text-sm text-gray-600">
                        AI-powered event scheduling that adapts to your preferences and
                        availability.
                    </Text>
                </View>
                <View className="bg-gray-200 p-4 rounded-lg my-2">
                    {/* Default people/community icon */}
                    <Text>👥</Text>
                    <Text className="text-lg font-bold text-gray-900 mb-1">Community Driven</Text>
                    <Text className="text-sm text-gray-600">
                        Connect with like-minded people and build lasting relationships.
                    </Text>
                </View>
            </View>

            {/* Featured Communities */}
            <Text className="text-base text-gray-600 mb-4">Featured Communities</Text>
            <View className="flex-row flex-wrap justify-between">
                {/* Community Card 1 */}
                <View className="w-[48%] bg-gray-200 p-4 rounded-lg mb-4 items-center">
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        className="w-12 h-12 rounded-full mb-2"
                    />
                    <Text className="text-sm text-gray-900 text-center">
                        Abrazando Corazones {'\n'} & Dejando Huella
                    </Text>
                </View>
                {/* Community Card 2 */}
                <View className="w-[48%] bg-gray-200 p-4 rounded-lg mb-4 items-center">
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        className="w-12 h-12 rounded-full mb-2"
                    />
                    <Text className="text-sm text-gray-900 text-center">
                        Abrazando Corazones {'\n'} & Dejando Huella
                    </Text>
                </View>
                {/* Community Card 3 */}
                <View className="w-[48%] bg-gray-200 p-4 rounded-lg mb-4 items-center">
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        className="w-12 h-12 rounded-full mb-2"
                    />
                    <Text className="text-sm text-gray-900 text-center">Andino</Text>
                </View>
                {/* Community Card 4 */}
                <View className="w-[48%] bg-gray-200 p-4 rounded-lg mb-4 items-center">
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        className="w-12 h-12 rounded-full mb-2"
                    />
                    <Text className="text-sm text-gray-900 text-center">CancherOS</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default DashboardView;
