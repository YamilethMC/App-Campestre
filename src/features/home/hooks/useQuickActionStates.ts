import { useState, useCallback, useRef, useEffect } from 'react';

interface UseQuickActionStates {
  vehicleRequested: boolean;
  waiterCalled: boolean;
  requestVehicle: () => void;
  callWaiter: () => void;
  resetVehicleRequest: () => void;
  resetWaiterCall: () => void;
}

export const useQuickActionStates = (): UseQuickActionStates => {
  const [vehicleRequested, setVehicleRequested] = useState(false);
  const [waiterCalled, setWaiterCalled] = useState(false);

  // Use refs to store timeout IDs to clear them when component unmounts
  const vehicleTimeoutRef = useRef<number | null>(null);
  const waiterTimeoutRef = useRef<number | null>(null);

  // Clear timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (vehicleTimeoutRef.current) {
        clearTimeout(vehicleTimeoutRef.current);
      }
      if (waiterTimeoutRef.current) {
        clearTimeout(waiterTimeoutRef.current);
      }
    };
  }, []);

  const requestVehicle = useCallback(() => {
    setVehicleRequested(true);
    // Clear any existing timeout
    if (vehicleTimeoutRef.current) {
      clearTimeout(vehicleTimeoutRef.current);
    }
    // Reset the state after 5 minutes (5 * 60 * 1000 ms)
    vehicleTimeoutRef.current = setTimeout(
      () => {
        setVehicleRequested(false);
      },
      5 * 60 * 1000,
    ); // 5 minutes
  }, []);

  const callWaiter = useCallback(() => {
    setWaiterCalled(true);
    // Clear any existing timeout
    if (waiterTimeoutRef.current) {
      clearTimeout(waiterTimeoutRef.current);
    }
    // Reset the state after 7 minutes (7 * 60 * 1000 ms)
    waiterTimeoutRef.current = setTimeout(
      () => {
        setWaiterCalled(false);
      },
      7 * 60 * 1000,
    ); // 7 minutes
  }, []);

  const resetVehicleRequest = useCallback(() => {
    setVehicleRequested(false);
    if (vehicleTimeoutRef.current) {
      clearTimeout(vehicleTimeoutRef.current);
      vehicleTimeoutRef.current = null;
    }
  }, []);

  const resetWaiterCall = useCallback(() => {
    setWaiterCalled(false);
    if (waiterTimeoutRef.current) {
      clearTimeout(waiterTimeoutRef.current);
      waiterTimeoutRef.current = null;
    }
  }, []);

  return {
    vehicleRequested,
    waiterCalled,
    requestVehicle,
    callWaiter,
    resetVehicleRequest,
    resetWaiterCall,
  };
};
