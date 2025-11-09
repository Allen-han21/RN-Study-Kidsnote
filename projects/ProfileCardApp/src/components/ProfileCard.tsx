import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileData {
  name: string;
  job: string;
  bio: string;
}

interface ValidationErrors {
  name?: string;
  job?: string;
  bio?: string;
}

const STORAGE_KEY = '@profile_data';

const ProfileCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Allen Han',
    job: 'iOS Developer',
    bio: 'React Native를 학습 중인 iOS 개발자입니다. SwiftUI와 React Native의 선언적 UI 패러다임을 비교하며 배우고 있습니다.',
  });

  const [tempProfile, setTempProfile] = useState<ProfileData>(profile);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // 프로필 데이터 불러오기
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const loadedProfile = JSON.parse(jsonValue);
        setProfile(loadedProfile);
        setTempProfile(loadedProfile);
      }
    } catch (e) {
      console.error('프로필 불러오기 실패:', e);
    }
  };

  const saveProfile = async (profileData: ProfileData) => {
    try {
      const jsonValue = JSON.stringify(profileData);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('프로필 저장 실패:', e);
      Alert.alert('저장 실패', '프로필 저장 중 오류가 발생했습니다.');
    }
  };

  // 입력 검증 함수
  const validateProfile = (data: ProfileData): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // 이름 검증
    if (!data.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    } else if (data.name.trim().length < 2) {
      newErrors.name = '이름은 2자 이상이어야 합니다';
    } else if (data.name.trim().length > 20) {
      newErrors.name = '이름은 20자 이하여야 합니다';
    }

    // 직업 검증
    if (!data.job.trim()) {
      newErrors.job = '직업을 입력해주세요';
    } else if (data.job.trim().length < 2) {
      newErrors.job = '직업은 2자 이상이어야 합니다';
    } else if (data.job.trim().length > 30) {
      newErrors.job = '직업은 30자 이하여야 합니다';
    }

    // 소개 검증
    if (!data.bio.trim()) {
      newErrors.bio = '소개를 입력해주세요';
    } else if (data.bio.trim().length < 10) {
      newErrors.bio = '소개는 10자 이상이어야 합니다';
    } else if (data.bio.trim().length > 200) {
      newErrors.bio = '소개는 200자 이하여야 합니다';
    }

    return newErrors;
  };

  const handleEditToggle = async () => {
    if (isEditMode) {
      // Save changes - 검증 후 저장
      const validationErrors = validateProfile(tempProfile);

      if (Object.keys(validationErrors).length > 0) {
        // 검증 실패
        setErrors(validationErrors);
        return;
      }

      // 검증 성공 - 저장
      setErrors({});
      setProfile(tempProfile);
      await saveProfile(tempProfile); // AsyncStorage에 저장
      Alert.alert('저장 완료', '프로필이 성공적으로 저장되었습니다.', [
        {text: '확인'},
      ]);
    } else {
      // Enter edit mode
      setTempProfile(profile);
      setErrors({});
    }
    setIsEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setErrors({});
    setIsEditMode(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>프로필 카드</Text>

      {/* 프로필 이미지 */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>

      {isEditMode ? (
        // Edit Mode
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={tempProfile.name}
              onChangeText={text => setTempProfile({...tempProfile, name: text})}
              placeholder="이름을 입력하세요"
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>직업</Text>
            <TextInput
              style={[styles.input, errors.job && styles.inputError]}
              value={tempProfile.job}
              onChangeText={text => setTempProfile({...tempProfile, job: text})}
              placeholder="직업을 입력하세요"
            />
            {errors.job && <Text style={styles.errorText}>{errors.job}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>소개</Text>
            <TextInput
              style={[
                styles.input,
                styles.bioInput,
                errors.bio && styles.inputError,
              ]}
              value={tempProfile.bio}
              onChangeText={text => setTempProfile({...tempProfile, bio: text})}
              placeholder="자기소개를 입력하세요"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  inputError: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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
