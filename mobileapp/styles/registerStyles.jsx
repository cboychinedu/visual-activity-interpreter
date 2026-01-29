// Importing the necessary modules 
import { StyleSheet } from "react-native";

// Creating the styles for the register component 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617', // slate-950
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  brandText: {
    color: '#60a5fa',
  },
  subtitle: {
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },
  formCard: {
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#fff',
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#2563eb',
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    color: '#64748b',
    paddingHorizontal: 10,
    fontSize: 12,
  },
  loginSecondaryBtn: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginSecondaryText: {
    color: '#cbd5e1',
    fontWeight: '600',
  }
});

// Exporting the styles styles 
export default styles; 