import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface ProfileData {
  name: string;
  job: string;
  bio: string;
}

const ProfileCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Allen Han',
    job: 'iOS Developer',
    bio: 'React Native를 학습 중인 iOS 개발자입니다. SwiftUI와 React Native의 선언적 UI 패러다임을 비교하며 배우고 있습니다.',
  });

  const [tempProfile, setTempProfile] = useState<ProfileData>(profile);

  const handleEditToggle = () => {
    if (isEditMode) {
      // Save changes
      setProfile(tempProfile);
    } else {
      // Enter edit mode
      setTempProfile(profile);
    }
    setIsEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditMode(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>프로필 카드</Text>

      {isEditMode ? (
        // Edit Mode
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              value={tempProfile.name}
              onChangeText={text => setTempProfile({...tempProfile, name: text})}
              placeholder="이름을 입력하세요"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>직업</Text>
            <TextInput
              style={styles.input}
              value={tempProfile.job}
              onChangeText={text => setTempProfile({...tempProfile, job: text})}
              placeholder="직업을 입력하세요"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>소개</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={tempProfile.bio}
              onChangeText={text => setTempProfile({...tempProfile, bio: text})}
              placeholder="자기소개를 입력하세요"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      ) : (
        // View Mode
        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>이름:</Text>
            <Text style={styles.value}>{profile.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>직업:</Text>
            <Text style={styles.value}>{profile.job}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>소개:</Text>
            <Text style={styles.value}>{profile.bio}</Text>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {isEditMode ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleEditToggle}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={handleEditToggle}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F8F8F8',
  },
  bioInput: {
    height: 100,
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileCard;
