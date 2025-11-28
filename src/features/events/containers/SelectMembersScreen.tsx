import React from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SelectMembers from '../components/SelectMembers';

type RootStackParamList = {
  SelectMembers: { eventId: string };
  Events: undefined;
};

type SelectMembersScreenRouteProp = RouteProp<RootStackParamList, 'SelectMembers'>;
type SelectMembersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SelectMembers'>;

const SelectMembersScreen: React.FC = () => {
  const route = useRoute<SelectMembersScreenRouteProp>();
  const navigation = useNavigation<SelectMembersScreenNavigationProp>();

  // This is a wrapper component that passes navigation props to the SelectMembers component
  return <SelectMembers route={route} navigation={navigation} />;
};

export default SelectMembersScreen;