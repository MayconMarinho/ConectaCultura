import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from "../components/footer";




export default function FinanceScreen({ navigation }) { 
  
const [showIncomeList, setShowIncomeList] = useState(false);

  // controla se o card de Add Income aparece ou não
const [showIncomeCard, setShowIncomeCard] = useState(false);

// guarda o texto da descrição da receita
const [incomeDescription, setIncomeDescription] = useState('');

// guarda o valor da receita
const [incomeValue, setIncomeValue] = useState('');

// guarda todas as receitas (lista)
const [incomes, setIncomes] = useState([]);

const monthlyIncome = incomes.reduce((total, item) => {
  return total + item.value;
}, 0);

// controla o modal de despesas
const [showExpenseCard, setShowExpenseCard] = useState(false);

// campos do formulário
const [expenseDescription, setExpenseDescription] = useState('');
const [expenseValue, setExpenseValue] = useState('');
const [expenseType, setExpenseType] = useState('fixed'); // fixed | variable

// listas
const [fixedExpenses, setFixedExpenses] = useState([]);
const [variableExpenses, setVariableExpenses] = useState([]);


const fixedTotal = fixedExpenses.reduce((total, item) => total + item.value, 0);
const variableTotal = variableExpenses.reduce((total, item) => total + item.value, 0);

const monthlyExpense = fixedTotal + variableTotal;

const monthlyBalance = monthlyIncome - monthlyExpense;

//Modal de gastos fixos
const [showFixedExpensesModal, setShowFixedExpensesModal] = useState(false);
//Modal de gastos variáveis
const [showVariableExpensesModal, setShowVariableExpensesModal] = useState(false);



const handleAddIncome = () => {
if (!incomeDescription.trim() || !incomeValue.trim()) return;

  const newIncome = {
    id: Date.now(),
    description: incomeDescription,
    value: Number(incomeValue),
  };

  const updatedIncomes = [...incomes, newIncome];


  setIncomes(updatedIncomes);

  saveIncomes(updatedIncomes);

  setIncomeDescription('');
  setIncomeValue('');
  setShowIncomeCard(false);
};

const removeIncomes = (id) => {
  const updatedIncomes = incomes.filter(
    item => item.id !== id
  );

  setIncomes(updatedIncomes);
  saveIncomes(updatedIncomes);
};

const handleAddExpense = () => {
  if (!expenseDescription.trim() || !expenseValue.trim()) return;

  const newExpense = {
    id: Date.now(),
    description: expenseDescription,
    value: Number(expenseValue),
  };

  const updatedFixedExpenses = [...fixedExpenses, newExpense];
  const updatedVariableExpenses = [...variableExpenses, newExpense];


  if (expenseType === 'fixed') {
    setFixedExpenses([...fixedExpenses, newExpense]);
    saveFixedExpenses(updatedFixedExpenses);
  } else {
    setVariableExpenses([...variableExpenses, newExpense]);
    saveVariableExpenses(updatedVariableExpenses);
  }

  // limpar campos
  setExpenseDescription('');
  setExpenseValue('');
  setExpenseType('fixed');
  setShowExpenseCard(false);
};

const removeFixedExpense = (id) => {
  const updatedFixedExpenses = fixedExpenses.filter(
    item => item.id !== id
  );

  setFixedExpenses(updatedFixedExpenses);
  saveFixedExpenses(updatedFixedExpenses);
};

const removeVariableExpense = (id) => {
  const updatedVariableExpenses = variableExpenses.filter(
    item => item.id !== id
  );

  setVariableExpenses(updatedVariableExpenses);
  saveVariableExpenses(updatedVariableExpenses);
};


//Salva as receitas
const saveIncomes = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('incomes', jsonValue);
  } catch (error) {
    console.log('Error saving incomes', error);
  }
};

//Busca o valor salvo em Incomes
const loadIncomes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('incomes');
    if (jsonValue !== null) {
      setIncomes(JSON.parse(jsonValue));
    }
  } catch (error) {
    console.log('Error loading incomes', error);
  }
};

useEffect(() => {
  loadIncomes();
}, []);

//Salva as despesas fixas
const saveFixedExpenses = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('fixedExpenses', jsonValue);
  } catch (error) {
    console.log('Error saving fixed expenses', error);
  }
};

//Busca o valor salvo em FixedExpenses
const loadFixedExpenses = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('fixedExpenses');
    if (jsonValue !== null) {
      setFixedExpenses(JSON.parse(jsonValue));
    }
  } catch (error) {
    console.log('Error loading fixed expenses', error);
  }
};

useEffect(() => {
  loadFixedExpenses();
}, []);

//Salva as despesas variáveis
const saveVariableExpenses = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('variableExpenses', jsonValue);
  } catch (error) {
    console.log('Error saving variable expenses', error);
  }
};

//Busca o valor salvo em VariableExpenses
const loadVariableExpenses = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('variableExpenses');
    if (jsonValue !== null) {
      setVariableExpenses(JSON.parse(jsonValue));
    }
  } catch (error) {
    console.log('Error loading variable expenses', error);
  }
};

useEffect(() => {
  loadVariableExpenses();
}, []);

const handleIncomeValueChange = (text) => {
  // troca vírgula por ponto
  let cleaned = text.replace(',', '.');

  // remove tudo que não for número ou ponto
  cleaned = cleaned.replace(/[^0-9.]/g, '');

  // impede mais de um ponto decimal
  if ((cleaned.match(/\./g) || []).length > 1) {
    return;
  }

  // limita a 20 caracteres
  if (cleaned.length > 20) return;

  setIncomeValue(cleaned);
};


const handleExpensesValueChange = (text) => {
  // troca vírgula por ponto
  let cleaned = text.replace(',', '.');

  // remove tudo que não for número ou ponto
  cleaned = cleaned.replace(/[^0-9.]/g, '');

  // impede mais de um ponto decimal
  if ((cleaned.match(/\./g) || []).length > 1) {
    return;
  }

  // limita a 20 caracteres
  if (cleaned.length > 20) return;

  setExpenseValue(cleaned);
};


const formatMoney = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
};








  return (
    <View style={styles.container}>
      <View style={styles.header}>
  <Text style={styles.title}>Controle financeiro</Text>
</View>


      <View style={styles.buttonsContainer}>
  <TouchableOpacity
  style={[styles.card, styles.cardShadow, { backgroundColor: '#1ecad3' }]}
  onPress={() => setShowIncomeCard(!showIncomeCard)}
>
  <Ionicons name="add-circle-outline" size={32} color="#fff" />
  <Text style={styles.cardText}>Receitas</Text>
</TouchableOpacity>


  <TouchableOpacity
  style={[styles.card, styles.cardShadow, { backgroundColor: '#ff4d6d' }]}
  onPress={() => setShowExpenseCard(true)}
>
  <Ionicons name="remove-circle-outline" size={32} color="#fff" />
  <Text style={styles.cardText}>Despesas</Text>
</TouchableOpacity>

</View>

<View style={styles.buttonsContainer}>
  <TouchableOpacity activeOpacity={0.8}
  onPress={() => setShowFixedExpensesModal(true)} style={[styles.card, styles.cardShadow, { backgroundColor: '#3a5ba0' }]}>
    <Ionicons name="home-outline" size={32} color="#fff" />
    <Text style={styles.cardText}>Despesas fixas</Text>
  </TouchableOpacity>

  <TouchableOpacity activeOpacity={0.8}
  onPress={() => setShowVariableExpensesModal(true)} style={[styles.card, styles.cardShadow, { backgroundColor: '#f28c28' }]}>
    <Ionicons name="swap-horizontal-outline" size={32} color="#fff" />
    <Text style={styles.cardText}>Despesas variáveis</Text>
  </TouchableOpacity>
</View>

<View style={styles.centerButtonContainer}>
  <TouchableOpacity
    style={[styles.card, styles.cardShadow, { backgroundColor: '#2ecc71' }]}
    onPress={() => setShowIncomeList(true)}
  >
    <Ionicons name="wallet-outline" size={32} color="#fff" />
    <Text style={styles.cardText}>Total receitas</Text>
  </TouchableOpacity>
</View>



<Modal
  visible={showIncomeCard}
  transparent
  animationType="fade"
>
  <View style={styles.overlay}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Adicione novas receitas</Text>

      <TextInput
        placeholder="Descrição da receita"
        placeholderTextColor="#999"
        value={incomeDescription}
        onChangeText={setIncomeDescription}
        maxLength={30}
        style={styles.input}
      />

      <TextInput
        placeholder="Valor"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={incomeValue}
        onChangeText={handleIncomeValueChange}
        maxLength={20}
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleAddIncome}>
        <Text style={styles.saveText}>Salvar receita</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowIncomeCard(false)}>
        <Text style={styles.closeText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

<Modal
  visible={showIncomeList}
  transparent
  animationType="slide"
>
  <View style={styles.overlay}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Lista de receitas</Text>

      {incomes.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma receita foi adicionada</Text>
      ) : (
        <ScrollView style={styles.listContainer}>
        {incomes.map(item => (
          <View key={item.id} style={styles.incomeItem}>
  <View>
    <Text style={styles.incomeDesc}>{item.description}</Text>
    <Text style={styles.incomeVal}>
  R$ {formatMoney(item.value)}
</Text>


  </View>
  

  <TouchableOpacity onPress={() => removeIncomes(item.id)}>
    <Ionicons name="trash-outline" size={22} color="#ff4d6d" />
  </TouchableOpacity>
</View>

        ))}
        
        </ScrollView>
      )}

      

      <TouchableOpacity onPress={() => setShowIncomeList(false)}>
        <Text style={styles.closeText}>Fechar</Text>
      </TouchableOpacity>
    </View>

  </View>
</Modal>

<Modal
  visible={showExpenseCard}
  transparent
  animationType="fade"
>
  <View style={styles.overlay}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Adicione novas despesas</Text>

      <TextInput
        placeholder="Descrição da despesa"
        placeholderTextColor="#999"
        value={expenseDescription}
        onChangeText={setExpenseDescription}
        maxLength={30}
        style={styles.input}
      />

      <TextInput
        placeholder="Valor"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={expenseValue}
        onChangeText={handleExpensesValueChange}
        maxLength={20}
        style={styles.input}
      />

      {/* Tipo da despesa */}
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            expenseType === 'fixed' && styles.typeActive
          ]}
          onPress={() => setExpenseType('fixed')}
        >
          <Text style={styles.typeText}>Fixa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            expenseType === 'variable' && styles.typeActive
          ]}
          onPress={() => setExpenseType('variable')}
        >
          <Text style={styles.typeText}>Variável</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleAddExpense}>
        <Text style={styles.saveText}>Salvar despesa</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowExpenseCard(false)}>
        <Text style={styles.closeText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

<Modal
  visible={showFixedExpensesModal}
  transparent
  animationType="fade"
>
  <View style={styles.overlay}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Despesas fixas</Text>

      {/* lista de despesas fixas */}
      {fixedExpenses.length === 0 ? (
  <Text style={styles.emptyText}>Sem despesas fixas por enquanto</Text>
) : (
  <ScrollView style={styles.listContainer}>
  {fixedExpenses.map((item) => (
    <View key={item.id} style={styles.itemRow}>
      <Text style={styles.itemText}>
  {item.description} - R$ {formatMoney(item.value)}
</Text>


      <TouchableOpacity onPress={() => removeFixedExpense(item.id)}>
        <Ionicons name="trash-outline" size={22} color="#ff4d6d" />
      </TouchableOpacity>
    </View>
  ))}
  </ScrollView>
)}


      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setShowFixedExpensesModal(false)}
      >
        <Text style={styles.closeText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

<Modal
  visible={showVariableExpensesModal}
  transparent
  animationType="fade"
>
  <View style={styles.overlay}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Despesas variáveis</Text>

      {variableExpenses.length === 0 ? (
  <Text style={styles.emptyText}>Sem despesas variáveis por enquanto</Text>
) : (
  <ScrollView style={styles.listContainer}>
  {variableExpenses.map((item) => (
    <View key={item.id} style={styles.itemRow}>
      <Text style={styles.itemText}>
  {item.description} - R$ {formatMoney(item.value)}
</Text>


      <TouchableOpacity onPress={() => removeVariableExpense(item.id)}>
        <Ionicons name="trash-outline" size={22} color="#ff4d6d" />
      </TouchableOpacity>
    </View>
  ))}
  </ScrollView>
)}


      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setShowVariableExpensesModal(false)}
      >
        <Text style={styles.closeText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>






<View style={styles.summaryCard}>
  <Text style={styles.summaryTitle}>Resumo mensal</Text>

  <View style={styles.summaryRow}>
  <View style={styles.labelWithIcon}>
    <Ionicons name="arrow-up-outline" size={18} color="#1ecad3" />
    <Text style={styles.summaryLabel}>Receitas</Text>
  </View>
  <Text style={styles.incomeValue}>
  R$ {formatMoney(monthlyIncome)}
</Text>

</View>


  <View style={styles.summaryRow}>
  <View style={styles.labelWithIcon}>
    <Ionicons name="arrow-down-outline" size={18} color="#ff4d6d" />
    <Text style={styles.summaryLabel}>Despesas</Text>
  </View>
 <Text style={styles.expenseValue}>
  R$ {formatMoney(monthlyExpense)}
</Text>

</View>


  <View style={styles.divider} />

  <View style={styles.summaryRow}>
    <Text style={styles.balanceLabel}>Saldo final</Text>
    <Text style={styles.balanceValue}>
  R$ {formatMoney(monthlyBalance)}
</Text>

  </View>
</View>

<Footer />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  buttonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 30,
},

card: {
  backgroundColor: '#1ecad3',
  width: '48%',
  height: 100,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
},

cardText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  marginTop: 8,
},
summaryCard: {
  backgroundColor: 'rgba(255,255,255,0.05)',
  borderRadius: 20,
  padding: 20,
  marginBottom: 30,
},

summaryTitle: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 15,
},

summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},

summaryLabel: {
  color: '#ccc',
  fontSize: 16,
},

incomeValue: {
  color: '#1ecad3',
  fontSize: 16,
  fontWeight: 'bold',
},

expenseValue: {
  color: '#ff4d6d',
  fontSize: 16,
  fontWeight: 'bold',
},

divider: {
  height: 1,
  backgroundColor: 'rgba(255,255,255,0.1)',
  marginVertical: 15,
},

balanceLabel: {
  color: '#1ecad3',
  fontSize: 16,
  fontWeight: 'bold',
},

balanceValue: {
  color: '#1ecad3',
  fontSize: 20,
  fontWeight: 'bold',
},

labelWithIcon: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},

cardShadow: {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.25,
  shadowRadius: 8,
  elevation: 8,
},

header: {
  marginBottom: 25,
},

title: {
  color: '#fff',
  fontSize: 30,
  fontWeight: 'bold',
  textAlign: 'center',
},

header: {
    marginTop: 20,
    marginBottom: 15,
},

footer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#2A2A2A',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderTopColor: '#1ecad3',
  elevation: 10,
  shadowColor: '#000',
  shadowOpacity: 0.3,
  shadowOffset: { width: 0, height: -2 },
  shadowRadius: 4,
  paddingBottom: 40,
},

footerItem: {
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
},

footerText: {
  fontSize: 12,
  color: '#ffffff',
  marginTop: 2,
},

input: {
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: 12,
  color: '#fff',
  marginBottom: 12,
},

saveButton: {
  backgroundColor: '#1ecad3',
  padding: 12,
  borderRadius: 10,
  alignItems: 'center',
},

saveText: {
  color: '#fff',
  fontWeight: 'bold',
},

overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalCard: {
  width: '90%',
  backgroundColor: '#1b1b2f',
  borderRadius: 20,
  padding: 20,
},

modalTitle: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 15,
  textAlign: 'center',
},

closeText: {
  color: '#ff4d6d',
  textAlign: 'center',
  marginTop: 15,
},

emptyText: {
  color: '#aaa',
  textAlign: 'center',
  marginVertical: 10,
},

incomeItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(255,255,255,0.05)',
  padding: 12,
  borderRadius: 10,
  marginBottom: 8,
},

incomeDesc: {
  color: '#fff',
},

incomeVal: {
  color: '#1ecad3',
  fontWeight: 'bold',
},

typeContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 15,
},

typeButton: {
  width: '48%',
  padding: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#1ecad3',
  alignItems: 'center',
},

typeActive: {
  backgroundColor: '#1ecad3',
},

typeText: {
  color: '#fff',
  fontWeight: 'bold',
},

itemRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255,0.05)',
  padding: 12,
  borderRadius: 12,
  marginBottom: 10,
},

itemText: {
  color: '#fff',
  fontSize: 15,
  flex: 1,
},

removeIcon: {
  fontSize: 18,
  marginLeft: 10,
},

centerButtonContainer: {
  alignItems: 'center',
  marginBottom: 30,
},

listContainer: {
  maxHeight: 300,
},


});
