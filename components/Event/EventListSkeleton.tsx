import { View } from 'react-native'
import SkeletonLoading from '../ui/SkeletonLoading'

const EventListSkeleton = () =>
  Array.from({ length: 3 }).map((_, index) => (
    <SkeletonLoading key={index} background={'#171717'} highlight={'#adadad'}>
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 10,
          overflow: 'hidden',
          marginVertical: 8
        }}
      >
        {/* Image Section */}
        <View style={{ width: '33%', padding: 4 }}>
          <View
            style={{
              width: '100%',
              height: 100,
              backgroundColor: '#adadad',
              borderRadius: 10
            }}
          />
        </View>

        {/* Content Section */}
        <View style={{ flex: 1, padding: 16 }}>
          {/* Title Skeleton */}
          <View
            style={{
              backgroundColor: '#adadad',
              width: '70%',
              height: 20,
              borderRadius: 5,
              marginBottom: 10
            }}
          />
          {/* Date Skeleton */}
          <View
            style={{
              backgroundColor: '#adadad',
              width: '50%',
              height: 14,
              borderRadius: 5,
              marginBottom: 6
            }}
          />
          {/* Location Skeleton */}
          <View
            style={{
              backgroundColor: '#adadad',
              width: '40%',
              height: 14,
              borderRadius: 5,
              marginBottom: 16
            }}
          />
          {/* Footer Skeleton */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#adadad',
                  borderRadius: 10,
                  marginRight: 8
                }}
              />
              <View
                style={{
                  backgroundColor: '#adadad',
                  width: 80,
                  height: 14,
                  borderRadius: 5
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#adadad',
                  borderRadius: 10,
                  marginRight: 8
                }}
              />
              <View
                style={{
                  backgroundColor: '#adadad',
                  width: 40,
                  height: 14,
                  borderRadius: 5
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SkeletonLoading>
  ))

export default EventListSkeleton
