import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';

// Get user information from auth service
const getUserInfo = () => {
  // Using mock user data from auth service
  return {
    id: '22308', // Member number as requested
    name: 'Mariana Landy Jimenez',
    address: 'Privada Jazmín No. 101 Col. Montealegre',
    city: 'Tampico, Tamaulipas',
    postalCode: '89210',
    memberSince: new Date('2020-05-15'),
    membershipType: 'Premium',
  };
};

// Mock data for account statements with detailed information
export const accountStatementService = {
  getAccountStatements: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockAccountStatements;
  },
  
  getAccountStatementById: async (id: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockAccountStatements.find(statement => statement.id === id) || null;
  },
  
  downloadAccountStatement: async (id: string) => {
    try {
      // Find the statement to download
      const statement = mockAccountStatements.find(stmt => stmt.id === id);
      
      if (!statement) {
        throw new Error('Statement not found');
      }

      // Get the asset based on the file name
      let assetModule;
      if (statement.fileName.includes('agosto')) {
        assetModule = require('../../../../assets/estados-cuenta/22308-agosto.pdf');
      } else if (statement.fileName.includes('septiembre')) {
        assetModule = require('../../../../assets/estados-cuenta/22308-septiembre.pdf');
      } else {
        throw new Error('Unknown file');
      }

      // Create an Asset object from the module
      const asset = Asset.fromModule(assetModule);
      
      // Download the asset if not already downloaded
      if (!asset.localUri) {
        await asset.downloadAsync();
      }

      // Get the destination path in the document directory
      const destinationUri = `${FileSystem.documentDirectory}${statement.fileName}`;
      
      // Copy the asset file to the document directory
      await FileSystem.copyAsync({
        from: asset.localUri || asset.uri,
        to: destinationUri,
      });

      // Return the destination URI
      return destinationUri;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }
};

// Mock account statements data
export const mockAccountStatements = [
  {
    id: 'stmt-001',
    month: 'septiembre',
    year: 2025,
    period: 'Septiembre 2025',
    date: '2025-09-30',
    dueDate: '2025-10-10', // 10 octubre 2025
    totalAmount: 11873.39,
    status: 'paid',
    concept: 'Estado de Cuenta Septiembre 2025',
    description: 'Consumos del 01/septiembre/2025 al 30/septiembre/2025. El presente estado de cuenta incluye cuota mensual del mes de Octubre 2025.',
    details: [
      { concept: 'Saldo Anterior', charges: 14531.69, credits: null },
      { concept: 'Sus pagos y abonos gracias', charges: null, credits: -14531.69 },
      { concept: 'Pagos', charges: null, credits: -14531.69 },
      { concept: 'Total cuotas y servicios', charges: 9349.99, credits: null },
      { concept: 'Cuota socio dependiente (Casado)', charges: 9349.99, credits: null },
      { concept: 'Total consumos mes anterior', charges: 2523.40, credits: null },
      { concept: 'Cocina', charges: null, credits: null },
      { concept: 'Cueva', charges: 35.00, credits: null },
      { concept: 'Pergola', charges: 1438.99, credits: null },
      { concept: 'Tenis', charges: 973.81, credits: null },
      { concept: 'Tules', charges: 75.60, credits: null },
    ],
    summary: [
      { concept: 'Saldo anterior', amount: 14531.69 },
      { concept: 'Pagos y abonos', amount: -14531.69 },
      { concept: 'Cuotas y consumos', amount: 11873.39 },
      { concept: 'Saldo final', amount: 11873.39 },
    ],
    pdfUrl: './estados-cuenta/22308-septiembre.pdf',
    fileName: '22308-septiembre.pdf',
    downloadUrl: './estados-cuenta/22308-septiembre.pdf',
    userInfo: getUserInfo()
  },
  {
    id: 'stmt-002',
    month: 'agosto',
    year: 2025,
    period: 'Agosto 2025',
    date: '2025-08-31',
    dueDate: '2025-09-10', // 10 septiembre 2025
    totalAmount: 14531.50,
    status: 'paid',
    concept: 'Estado de Cuenta Agosto 2025',
    description: 'Consumos del 01/agosto/2025 al 31/agosto/2025. El presente estado de cuenta incluye cuota mensual del mes de Septiembre 2025.',
    details: [
      { concept: 'Saldo Anterior', charges: 13221.03, credits: null },
      { concept: 'Sus pagos y abonos gracias', charges: null, credits: -13221.03 },
      { concept: 'Pagos', charges: null, credits: -13221.03 },
      { concept: 'Total cuotas y servicios', charges: 9349.99, credits: null },
      { concept: 'Cuota socio dependiente (Casado)', charges: 9349.99, credits: null },
      { concept: 'Total consumos mes anterior', charges: 5181.51, credits: null },
      { concept: 'Cocina', charges: null, credits: null },
      { concept: 'Cueva', charges: 605.26, credits: null },
      { concept: 'Hoyo 7', charges: 76.50, credits: null },
      { concept: 'Oasis', charges: 727.00, credits: null },
      { concept: 'Pergola', charges: 2111.35, credits: null },
      { concept: 'Tenis', charges: 137.02, credits: null },
      { concept: 'Tules', charges: 1314.38, credits: null },
      { concept: 'Vista bella', charges: 210.00, credits: null },
    ],
    summary: [
      { concept: 'Saldo anterior', amount: 13221.03 },
      { concept: 'Pagos y abonos', amount: -13221.03 },
      { concept: 'Cuotas y consumos', amount: 14531.50 },
      { concept: 'Saldo final', amount: 14531.50 },
    ],
    pdfUrl: './estados-cuenta/22308-agosto.pdf',
    fileName: '22308-agosto.pdf',
    downloadUrl: './estados-cuenta/22308-agosto.pdf',
    userInfo: getUserInfo()
  }
];