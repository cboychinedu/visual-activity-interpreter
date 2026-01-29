// Importing the necessary modules 
import { StyleSheet } from "react-native";

// Creating the styles styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617', // slate-950
  },
  heroSection: {
    padding: 24,
    paddingVertical: 40,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 48,
  },
  accentText: {
    color: '#60a5fa', // blue-400
  },
  heroSubtitle: {
    marginTop: 16,
    fontSize: 18,
    color: '#94a3b8', // slate-400
    lineHeight: 26,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  secondaryButton: {
    borderWidth: 3,
    width: 100, 
    borderColor: '#334155',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  section: {
    padding: 24,
    backgroundColor: '#0f172a', // slate-900
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  underline: {
    height: 4,
    width: 60,
    backgroundColor: '#3b82f6',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  iconWrapper: {
    marginBottom: 12,
  },
  featureTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  featureDesc: {
    color: '#94a3b8',
    fontSize: 12,
  },
  techStackCard: {
    margin: 24,
    padding: 24,
    backgroundColor: '#1e293b',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  techStackHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  techGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  techCategory: {
    color: '#60a5fa',
    fontWeight: '600',
    marginBottom: 8,
  },
  techItem: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 4,
  }

}); 

// Exporting the home styles 
export default styles; 