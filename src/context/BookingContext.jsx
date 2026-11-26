import { createContext, useContext, useState, useEffect } from 'react';
import initialClasses from '../data/classes.json';

const BookingContext = createContext(null);

const STORAGE_KEY_BOOKED = 'gym_portal_booked_classes';
const STORAGE_KEY_CLASSES_STATE = 'gym_portal_classes_inventory';
const STORAGE_KEY_REGISTRATION = 'gym_portal_registration_data';

export function BookingProvider({ children }) {
  // 1. Array of booked class IDs (persisted)
  const [bookedClassIds, setBookedClassIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Class inventory with live spots count (persisted)
  const [classesList, setClassesList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CLASSES_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with initialClasses to keep metadata and coach names up to date
        return initialClasses.map((c) => {
          const match = parsed.find((p) => p.id === c.id);
          return match ? { ...c, spotsLeft: match.spotsLeft } : c;
        });
      }
    } catch (e) {
      console.error('Error reading localStorage classes:', e);
    }
    return initialClasses;
  });

  // 3. Last completed registration data
  const [lastRegistration, setLastRegistration] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REGISTRATION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync booked IDs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKED, JSON.stringify(bookedClassIds));
    } catch (e) {
      console.error('Error saving booked IDs:', e);
    }
  }, [bookedClassIds]);

  // Sync classes inventory to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CLASSES_STATE, JSON.stringify(classesList));
    } catch (e) {
      console.error('Error saving classes inventory:', e);
    }
  }, [classesList]);

  // Sync registration to localStorage
  useEffect(() => {
    try {
      if (lastRegistration) {
        localStorage.setItem(STORAGE_KEY_REGISTRATION, JSON.stringify(lastRegistration));
      }
    } catch (e) {
      console.error('Error saving registration:', e);
    }
  }, [lastRegistration]);

  // Book a class
  const bookClass = (classId) => {
    if (bookedClassIds.includes(classId)) return false;

    const targetClass = classesList.find((c) => c.id === classId);
    if (!targetClass || targetClass.spotsLeft <= 0) return false;

    // Decrement spotsLeft and add to booked list
    setClassesList((prev) =>
      prev.map((c) =>
        c.id === classId ? { ...c, spotsLeft: Math.max(0, c.spotsLeft - 1) } : c
      )
    );
    setBookedClassIds((prev) => [...prev, classId]);
    return true;
  };

  // Cancel a class booking
  const cancelBooking = (classId) => {
    if (!bookedClassIds.includes(classId)) return false;

    // Increment spotsLeft (up to totalSpots) and remove from booked list
    setClassesList((prev) =>
      prev.map((c) =>
        c.id === classId ? { ...c, spotsLeft: Math.min(c.totalSpots, c.spotsLeft + 1) } : c
      )
    );
    setBookedClassIds((prev) => prev.filter((id) => id !== classId));
    return true;
  };

  // Save registration submission
  const completeRegistration = (data) => {
    setLastRegistration(data);
  };

  const bookingCount = bookedClassIds.length;

  return (
    <BookingContext.Provider
      value={{
        bookedClassIds,
        classesList,
        bookingCount,
        bookClass,
        cancelBooking,
        lastRegistration,
        completeRegistration,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
