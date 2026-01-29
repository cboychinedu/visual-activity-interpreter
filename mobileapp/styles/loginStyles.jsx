// Importing the necessary modules 
import { StyleSheet } from "react-native";

// Creating the styles for the login page 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  scrollContent: { padding: 24, alignItems: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 32, marginTop: 20 },
  iconCircle: {
    padding: 16,
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    marginBottom: 16
  },
  title: { fontSize: 32, fontWeight: '800', color: '#fff' },
  accentText: { color: '#60a5fa' },
  subtitle: { color: '#94a3b8', textAlign: 'center', marginTop: 8, fontSize: 14 },
  card: {
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1e293b'
  },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#cbd5e1', fontSize: 14, marginBottom: 8, fontWeight: '500' },
  forgotText: { color: '#60a5fa', fontSize: 12 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
    paddingHorizontal: 12
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 48, color: '#fff' },
  loginButton: {
    backgroundColor: '#2563eb',
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  loginButtonText: { color: '#fff', fontWeight: 'bold', marginRight: 8 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  line: { flex: 1, height: 1, backgroundColor: '#1e293b' },
  dividerText: { color: '#64748b', paddingHorizontal: 10, fontSize: 12 },
  registerButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerButtonText: { color: '#cbd5e1', fontWeight: '500' }
});

// Exporting the styles 
export default styles; 