import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAQ } from '../../interfaces';
import styles from './Style';

interface FAQListProps {
  faqs: FAQ[];
}

const FAQList: React.FC<FAQListProps> = ({ faqs }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {faqs.map(faq => (
        <View key={faq.id} style={styles.faqCard}>
          <TouchableOpacity style={styles.questionContainer} onPress={() => toggleFAQ(faq.id)}>
            <Text style={styles.questionText}>{faq.question}</Text>
            <Ionicons
              name={expandedId === faq.id ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#10B981"
            />
          </TouchableOpacity>

          {expandedId === faq.id && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{faq.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default FAQList;
