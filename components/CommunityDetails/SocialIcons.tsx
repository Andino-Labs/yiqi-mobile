import BiFacebookIcon from '@/assets/svgs/SocialIcons/BiFacebookIcon'
import BiInstagramIcon from '@/assets/svgs/SocialIcons/BiInstagramIcon'
import BiLinkedInIcon from '@/assets/svgs/SocialIcons/BiLinkedInIcon'
import BiTiktokIcon from '@/assets/svgs/SocialIcons/BiTiktokIcon'
import BiWebsiteIcon from '@/assets/svgs/SocialIcons/BiWebsiteIcon'
import { OrganizationType } from '@/types/eventTypes'
import React from 'react'
import { Linking, Pressable, View } from 'react-native'

type SocialIconsProps = { organization: OrganizationType }
interface SocialIconProps {
  href: string
  icon: React.ReactNode
}

const SocialIcon = ({ href, icon }: SocialIconProps) => (
  <Pressable
    onPress={() => Linking.openURL(href)}
    key={href}
    className="text-gray-400 rounded-full p-2 border border-gray-600 bg-gray-800 mr-2"
  >
    {icon}
  </Pressable>
)

const SocialIcons: React.FC<SocialIconsProps> = ({ organization }) => (
  <View className="flex-row flex-wrap items-center mt-2">
    {organization.facebook && (
      <SocialIcon
        href={organization.facebook}
        icon={<BiFacebookIcon className="w-4 h-4" />}
      />
    )}
    {organization.instagram && (
      <SocialIcon
        href={organization.instagram}
        icon={<BiInstagramIcon className="w-4 h-4" />}
      />
    )}
    {organization.tiktok && (
      <SocialIcon
        href={organization.tiktok}
        icon={<BiTiktokIcon className="w-4 h-4" />}
      />
    )}
    {organization.linkedin && (
      <SocialIcon
        href={organization.linkedin}
        icon={<BiLinkedInIcon className="w-4 h-4" />}
      />
    )}
    {organization.website && (
      <SocialIcon
        href={organization.website}
        icon={<BiWebsiteIcon className="w-4 h-4" />}
      />
    )}
  </View>
)

export default SocialIcons
