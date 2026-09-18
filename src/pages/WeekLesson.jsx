import React, { useState } from 'react';

const WeekLesson = ({ weekNum, user, onNavigate, onExerciseComplete, onLogout }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showExercise, setShowExercise] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const weekData = {
    1: {
      titleEn: "Basic Concepts of OOP",
      titleAr: "المفاهيم الأساسية للـ OOP",
      icon: "🎯",
      video: { title: "Introduction to OOP", titleAr: "مقدمة في البرمجة الشيئية", youtubeId: "pTB0EiLXUC8", description: "Learn the fundamental concepts of Object-Oriented Programming." },
      content: [
        { type: "intro", titleEn: "Welcome to Week 1!", titleAr: "مرحباً بك في الأسبوع الأول!", contentEn: "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of objects, which contain data and code.", contentAr: "البرمجة الشيئية (OOP) هي نموذج برمجة يعتمد على مفهوم الكائنات التي تحتوي على البيانات والكود." },
        { type: "concept", titleEn: "Four Pillars of OOP", titleAr: "الأركان الأربعة للـ OOP", contentEn: "OOP has four main principles that guide its design.", contentAr: "البرمجة الشيئية لها أربعة مبادئ رئيسية توجه تصميمها.", keyPoints: [
          { en: "Encapsulation: Bundling data and methods together", ar: "التغليف: تجميع البيانات والطرق معاً" },
          { en: "Abstraction: Hiding complex implementation details", ar: "التجريد: إخفاء تفاصيل التنفيذ المعقدة" },
          { en: "Inheritance: Creating new classes from existing ones", ar: "الوراثة: إنشاء فئات جديدة من الموجودة" },
          { en: "Polymorphism: Same interface, different implementations", ar: "تعدد الأشكال: نفس الواجهة، تنفيذات مختلفة" }
        ]},
        { type: "code", titleEn: "Hello World in Java", titleAr: "Hello World في Java", code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to OOP!");
    }
}`, explanation: "Every Java program starts with a class and a main method.", explanationAr: "كل برنامج Java يبدأ بفئة ودالة main." }
      ],
      exercises: [
        { q: "OOP stands for:", qAr: "OOP تعني:", options: ["Object-Oriented Programming", "Object-Only Programming", "Open-Object Programming", "Oriented-Object Programming"], correct: 0 },
        { q: "Which is NOT a pillar of OOP?", qAr: "أي من التالي ليس ركن من أركان OOP؟", options: ["Encapsulation", "Compilation", "Inheritance", "Polymorphism"], correct: 1 },
        { q: "Encapsulation means:", qAr: "التغليف يعني:", options: ["Hiding data only", "Bundling data and methods", "Creating objects", "Deleting classes"], correct: 1 },
        { q: "Java programs start with:", qAr: "برامج Java تبدأ بـ:", options: ["function", "method", "class", "object"], correct: 2 },
        { q: "System.out.println() is used to:", qAr: "System.out.println() تستخدم لـ:", options: ["Read input", "Print output", "Create class", "Define variable"], correct: 1 }
      ]
    },
    2: {
      titleEn: "Classes and Objects",
      titleAr: "الفئات والكائنات",
      icon: "📦",
      video: { title: "Classes and Objects in Java", titleAr: "الفئات والكائنات في Java", youtubeId: "IUqKuGNasdM", description: "Understanding classes, objects, and data types." },
      content: [
        { type: "intro", titleEn: "Welcome to Week 2!", titleAr: "مرحباً بك في الأسبوع الثاني!", contentEn: "A class is a blueprint for creating objects. Objects are instances of classes.", contentAr: "الفئة هي مخطط لإنشاء الكائنات. الكائنات هي نسخ من الفئات." },
        { type: "code", titleEn: "Creating a Class", titleAr: "إنشاء فئة", code: `public class Student {
    // Attributes (instance variables)
    String name;
    int age;
    double gpa;
    
    // Method
    void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
    }
}`, explanation: "A class contains attributes (variables) and methods (functions).", explanationAr: "الفئة تحتوي على صفات (متغيرات) وطرق (دوال)." },
        { type: "code", titleEn: "Creating Objects", titleAr: "إنشاء كائنات", code: `public class Main {
    public static void main(String[] args) {
        // Create object
        Student s1 = new Student();
        
        // Set values
        s1.name = "Ahmed";
        s1.age = 20;
        s1.gpa = 3.5;
        
        // Call method
        s1.display();
    }
}`, explanation: "Use 'new' keyword to create objects from a class.", explanationAr: "استخدم كلمة 'new' لإنشاء كائنات من الفئة." },
        { type: "concept", titleEn: "Data Types in Java", titleAr: "أنواع البيانات في Java", contentEn: "Java has primitive and reference data types.", contentAr: "Java لديها أنواع بيانات أولية ومرجعية.", keyPoints: [
          { en: "int: Integer numbers (4 bytes)", ar: "int: أرقام صحيحة (4 بايت)" },
          { en: "double: Decimal numbers (8 bytes)", ar: "double: أرقام عشرية (8 بايت)" },
          { en: "boolean: true or false", ar: "boolean: صح أو خطأ" },
          { en: "String: Text (reference type)", ar: "String: نص (نوع مرجعي)" }
        ]}
      ],
      exercises: [
        { q: "A class is:", qAr: "الفئة هي:", options: ["An object", "A blueprint for objects", "A variable", "A method"], correct: 1 },
        { q: "To create an object, use:", qAr: "لإنشاء كائن، استخدم:", options: ["create", "new", "make", "build"], correct: 1 },
        { q: "Instance variables are:", qAr: "متغيرات النسخة هي:", options: ["Methods", "Attributes of a class", "Parameters", "Constants"], correct: 1 },
        { q: "int data type stores:", qAr: "نوع int يخزن:", options: ["Decimals", "Text", "Integers", "Boolean"], correct: 2 },
        { q: "String is a:", qAr: "String هو:", options: ["Primitive type", "Reference type", "Method", "Class only"], correct: 1 }
      ]
    },
    3: {
      titleEn: "Control Statements",
      titleAr: "عبارات التحكم",
      icon: "🔀",
      video: { title: "Control Flow in Java", titleAr: "التحكم في التدفق في Java", youtubeId: "ldYLYRNaucM", description: "Learn if-else, switch, and loops in Java." },
      content: [
        { type: "intro", titleEn: "Welcome to Week 3!", titleAr: "مرحباً بك في الأسبوع الثالث!", contentEn: "Control statements determine the flow of program execution based on conditions.", contentAr: "عبارات التحكم تحدد تدفق تنفيذ البرنامج بناءً على الشروط." },
        { type: "code", titleEn: "If-Else Statement", titleAr: "عبارة If-Else", code: `int score = 85;

if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: F");
}`, explanation: "if-else allows different actions based on conditions.", explanationAr: "if-else تسمح بإجراءات مختلفة بناءً على الشروط." },
        { type: "code", titleEn: "For Loop", titleAr: "حلقة For", code: `// Print numbers 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}

// Print pattern
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}`, explanation: "For loops repeat code a specific number of times.", explanationAr: "حلقات For تكرر الكود عدد محدد من المرات." },
        { type: "code", titleEn: "While Loop", titleAr: "حلقة While", code: `int count = 1;
while (count <= 5) {
    System.out.println("Count: " + count);
    count++;
}

// Do-while (executes at least once)
int num = 1;
do {
    System.out.println(num);
    num++;
} while (num <= 3);`, explanation: "While loops continue while condition is true.", explanationAr: "حلقات While تستمر طالما الشرط صحيح." }
      ],
      exercises: [
        { q: "if-else is used for:", qAr: "if-else تستخدم لـ:", options: ["Loops", "Decision making", "Creating objects", "Printing"], correct: 1 },
        { q: "for loop has how many parts?", qAr: "حلقة for لها كم جزء؟", options: ["2", "3", "4", "5"], correct: 1 },
        { q: "while loop checks condition:", qAr: "حلقة while تفحص الشرط:", options: ["After execution", "Before execution", "Never", "Once only"], correct: 1 },
        { q: "do-while executes at least:", qAr: "do-while تنفذ على الأقل:", options: ["Zero times", "One time", "Two times", "Three times"], correct: 1 },
        { q: "break statement:", qAr: "عبارة break:", options: ["Continues loop", "Exits loop", "Skips iteration", "Starts loop"], correct: 1 }
      ]
    },
    4: {
      titleEn: "Access Specifiers",
      titleAr: "محددات الوصول",
      icon: "🔐",
      video: { title: "Access Modifiers in Java", titleAr: "محددات الوصول في Java", youtubeId: "T632kAJ_9VA", description: "Understanding public, private, and protected access." },
      content: [
        { type: "intro", titleEn: "Welcome to Week 4!", titleAr: "مرحباً بك في الأسبوع الرابع!", contentEn: "Access specifiers control the visibility of class members (variables and methods).", contentAr: "محددات الوصول تتحكم في رؤية أعضاء الفئة (المتغيرات والطرق)." },
        { type: "concept", titleEn: "Types of Access Specifiers", titleAr: "أنواع محددات الوصول", contentEn: "Java has four access levels.", contentAr: "Java لديها أربعة مستويات وصول.", keyPoints: [
          { en: "public: Accessible from anywhere", ar: "public: يمكن الوصول من أي مكان" },
          { en: "private: Accessible only within the class", ar: "private: يمكن الوصول فقط داخل الفئة" },
          { en: "protected: Accessible in package and subclasses", ar: "protected: يمكن الوصول في الحزمة والفئات الفرعية" },
          { en: "default: Accessible only within package", ar: "default: يمكن الوصول فقط داخل الحزمة" }
        ]},
        { type: "code", titleEn: "Encapsulation Example", titleAr: "مثال على التغليف", code: `public class BankAccount {
    private double balance;  // Private - hidden
    
    // Public getter
    public double getBalance() {
        return balance;
    }
    
    // Public setter with validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
}`, explanation: "Private variables with public getters/setters is encapsulation.", explanationAr: "المتغيرات الخاصة مع getters/setters العامة هي التغليف." }
      ],
      exercises: [
        { q: "private members are accessible:", qAr: "الأعضاء private يمكن الوصول إليها:", options: ["Everywhere", "Same package", "Same class only", "Subclasses"], correct: 2 },
        { q: "public means:", qAr: "public تعني:", options: ["Hidden", "Accessible anywhere", "Package only", "Protected"], correct: 1 },
        { q: "Getters are used to:", qAr: "Getters تستخدم لـ:", options: ["Set values", "Get values", "Delete values", "Create objects"], correct: 1 },
        { q: "Encapsulation uses:", qAr: "التغليف يستخدم:", options: ["Only public", "Only private", "Private data + public methods", "No access specifiers"], correct: 2 },
        { q: "Default access is:", qAr: "الوصول الافتراضي هو:", options: ["public", "private", "Package-private", "protected"], correct: 2 }
      ]
    },
    5: {
      titleEn: "Constructor & Static",
      titleAr: "المُنشئ والمتغيرات الثابتة",
      icon: "🏗️",
      video: { title: "Constructors in Java", titleAr: "المُنشئات في Java", youtubeId: "oSiN1J_G01Q", description: "Learn about constructors and static members." },
      content: [
        { type: "intro", titleEn: "Welcome to Week 5!", titleAr: "مرحباً بك في الأسبوع الخامس!", contentEn: "Constructors initialize objects when they are created. Static members belong to the class, not instances.", contentAr: "المُنشئات تهيئ الكائنات عند إنشائها. الأعضاء الثابتة تنتمي للفئة، ليس للنسخ." },
        { type: "code", titleEn: "Constructor Types", titleAr: "أنواع المُنشئات", code: `public class Student {
    String name;
    int age;
    
    // Default constructor
    public Student() {
        name = "Unknown";
        age = 0;
    }
    
    // Parameterized constructor
    public Student(String n, int a) {
        name = n;
        age = a;
    }
    
    // Constructor with 'this' keyword
    public Student(String name, int age) {
        this.name = name;  // this refers to current object
        this.age = age;
    }
}`, explanation: "Constructors have the same name as the class and no return type.", explanationAr: "المُنشئات لها نفس اسم الفئة وبدون نوع إرجاع." },
        { type: "code", titleEn: "Static Variables & Methods", titleAr: "المتغيرات والطرق الثابتة", code: `public class Counter {
    static int count = 0;  // Shared by all objects
    int id;
    
    public Counter() {
        count++;
        id = count;
    }
    
    // Static method
    public static int getCount() {
        return count;
    }
}

// Usage:
Counter c1 = new Counter();  // count = 1
Counter c2 = new Counter();  // count = 2
System.out.println(Counter.getCount());  // 2`, explanation: "Static members are shared across all instances of a class.", explanationAr: "الأعضاء الثابتة مشتركة بين جميع نسخ الفئة." }
      ],
      exercises: [
        { q: "Constructor name must be:", qAr: "اسم المُنشئ يجب أن يكون:", options: ["Any name", "Same as class name", "main", "void"], correct: 1 },
        { q: "Constructor return type is:", qAr: "نوع إرجاع المُنشئ هو:", options: ["void", "int", "No return type", "Object"], correct: 2 },
        { q: "'this' keyword refers to:", qAr: "كلمة 'this' تشير إلى:", options: ["Other object", "Current object", "Static variable", "Main method"], correct: 1 },
        { q: "Static variables are:", qAr: "المتغيرات الثابتة:", options: ["Per object", "Shared by all objects", "Private only", "Cannot be changed"], correct: 1 },
        { q: "Static methods can access:", qAr: "الطرق الثابتة يمكنها الوصول إلى:", options: ["Instance variables", "Static variables only", "Private variables", "All variables"], correct: 1 }
      ]
    },
    6: {
      titleEn: "Exception Handling",
      titleAr: "معالجة الاستثناءات",
      icon: "⚠️",
      video: { title: "Exception Handling in Java", titleAr: "معالجة الاستثناءات في Java", youtubeId: "1XAfapkBQjk", description: "Learn to handle errors gracefully with try-catch." },
      content: [
        { type: "intro", titleEn: "Welcome to Week 6!", titleAr: "مرحباً بك في الأسبوع السادس!", contentEn: "Exception handling allows programs to deal with errors gracefully without crashing.", contentAr: "معالجة الاستثناءات تسمح للبرامج بالتعامل مع الأخطاء بشكل سلس دون التوقف." },
        { type: "code", titleEn: "Try-Catch Block", titleAr: "كتلة Try-Catch", code: `public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);  // Error!
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error!");
        } finally {
            System.out.println("This always runs");
        }
    }
}`, explanation: "try contains risky code, catch handles errors, finally always executes.", explanationAr: "try تحتوي الكود الخطر، catch تعالج الأخطاء، finally تنفذ دائماً." },
        { type: "code", titleEn: "Multiple Catch & Throw", titleAr: "Catch متعددة و Throw", code: `public static int divide(int a, int b) throws ArithmeticException {
    if (b == 0) {
        throw new ArithmeticException("Cannot divide by zero!");
    }
    return a / b;
}

public static void main(String[] args) {
    try {
        int result = divide(10, 0);
    } catch (ArithmeticException e) {
        System.out.println("Error: " + e.getMessage());
    } catch (Exception e) {
        System.out.println("General error");
    }
}`, explanation: "throw creates an exception, throws declares it in method signature.", explanationAr: "throw تنشئ استثناء، throws تعلن عنه في توقيع الطريقة." }
      ],
      exercises: [
        { q: "try block contains:", qAr: "كتلة try تحتوي:", options: ["Safe code", "Risky code", "Error messages", "Final code"], correct: 1 },
        { q: "catch block:", qAr: "كتلة catch:", options: ["Creates errors", "Handles errors", "Ignores errors", "Throws errors"], correct: 1 },
        { q: "finally block:", qAr: "كتلة finally:", options: ["Never runs", "Runs on error only", "Always runs", "Runs on success only"], correct: 2 },
        { q: "throw keyword:", qAr: "كلمة throw:", options: ["Catches exception", "Creates exception", "Ignores exception", "Declares exception"], correct: 1 },
        { q: "NullPointerException occurs when:", qAr: "NullPointerException يحدث عندما:", options: ["Array is empty", "Using null object", "Division by zero", "File not found"], correct: 1 }
      ]
    },
    7: {
      titleEn: "Inheritance",
      titleAr: "الوراثة",
      icon: "👨‍👦",
      video: { title: "Inheritance in Java", titleAr: "الوراثة في Java", youtubeId: "Zs342ePFvRI", description: "Learn how classes can inherit from other classes." },
      content: [
        { type: "intro", titleEn: "Welcome to Week 7!", titleAr: "مرحباً بك في الأسبوع السابع!", contentEn: "Inheritance allows a class to inherit properties and methods from another class.", contentAr: "الوراثة تسمح لفئة بأن ترث الخصائص والطرق من فئة أخرى." },
        { type: "code", titleEn: "Basic Inheritance", titleAr: "الوراثة الأساسية", code: `// Parent class (superclass)
public class Animal {
    String name;
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class (subclass)
public class Dog extends Animal {
    public void bark() {
        System.out.println(name + " is barking");
    }
}

// Usage
Dog d = new Dog();
d.name = "Buddy";
d.eat();    // Inherited from Animal
d.bark();   // Dog's own method`, explanation: "extends keyword is used to inherit from a parent class.", explanationAr: "كلمة extends تستخدم للوراثة من فئة أب." },
        { type: "code", titleEn: "super Keyword", titleAr: "كلمة super", code: `public class Animal {
    String name;
    
    public Animal(String name) {
        this.name = name;
    }
}

public class Cat extends Animal {
    String color;
    
    public Cat(String name, String color) {
        super(name);  // Call parent constructor
        this.color = color;
    }
    
    public void display() {
        System.out.println("Name: " + super.name);  // Access parent's name
        System.out.println("Color: " + color);
    }
}`, explanation: "super is used to call parent class constructor and methods.", explanationAr: "super تستخدم لاستدعاء مُنشئ وطرق الفئة الأب." }
      ],
      exercises: [
        { q: "Inheritance uses keyword:", qAr: "الوراثة تستخدم كلمة:", options: ["inherits", "extends", "implements", "super"], correct: 1 },
        { q: "Parent class is also called:", qAr: "الفئة الأب تسمى أيضاً:", options: ["Subclass", "Superclass", "Child class", "Derived class"], correct: 1 },
        { q: "super() calls:", qAr: "super() تستدعي:", options: ["Child constructor", "Parent constructor", "Main method", "Static method"], correct: 1 },
        { q: "Java supports:", qAr: "Java تدعم:", options: ["Multiple inheritance", "Single inheritance", "No inheritance", "Triple inheritance"], correct: 1 },
        { q: "Child class can access parent's:", qAr: "الفئة الابن يمكنها الوصول إلى:", options: ["Private members", "Public & protected members", "Only public", "Nothing"], correct: 1 }
      ]
    },
    8: {
      titleEn: "Polymorphism",
      titleAr: "تعدد الأشكال",
      icon: "🔄",
      video: { title: "Polymorphism in Java", titleAr: "تعدد الأشكال في Java", youtubeId: "jhDUxynEQRI", description: "Understanding method overloading and overriding." },
      content: [
        { type: "intro", titleEn: "Welcome to Week 8!", titleAr: "مرحباً بك في الأسبوع الثامن!", contentEn: "Polymorphism means 'many forms'. It allows methods to behave differently based on the object.", contentAr: "تعدد الأشكال يعني 'أشكال كثيرة'. يسمح للطرق بالتصرف بشكل مختلف بناءً على الكائن." },
        { type: "code", titleEn: "Method Overloading", titleAr: "زيادة التحميل للطرق", code: `public class Calculator {
    // Same method name, different parameters
    public int add(int a, int b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
calc.add(5, 3);        // Calls first method
calc.add(5, 3, 2);     // Calls second method
calc.add(5.5, 3.5);    // Calls third method`, explanation: "Overloading: Same method name, different parameters (compile-time polymorphism).", explanationAr: "زيادة التحميل: نفس اسم الطريقة، معاملات مختلفة (تعدد أشكال وقت الترجمة)." },
        { type: "code", titleEn: "Method Overriding", titleAr: "إعادة تعريف الطرق", code: `public class Shape {
    public void draw() {
        System.out.println("Drawing a shape");
    }
}

public class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

public class Rectangle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
}

// Runtime polymorphism
Shape s1 = new Circle();
Shape s2 = new Rectangle();
s1.draw();  // "Drawing a circle"
s2.draw();  // "Drawing a rectangle"`, explanation: "Overriding: Child class redefines parent's method (runtime polymorphism).", explanationAr: "إعادة التعريف: الفئة الابن تعيد تعريف طريقة الأب (تعدد أشكال وقت التشغيل)." }
      ],
      exercises: [
        { q: "Overloading is:", qAr: "زيادة التحميل هي:", options: ["Same name, same parameters", "Same name, different parameters", "Different names", "No parameters"], correct: 1 },
        { q: "Overriding occurs in:", qAr: "إعادة التعريف تحدث في:", options: ["Same class", "Different classes (inheritance)", "Static methods", "Constructors"], correct: 1 },
        { q: "@Override is:", qAr: "@Override هي:", options: ["Required", "Optional annotation", "A method", "A class"], correct: 1 },
        { q: "Compile-time polymorphism:", qAr: "تعدد أشكال وقت الترجمة:", options: ["Overriding", "Overloading", "Inheritance", "Encapsulation"], correct: 1 },
        { q: "Runtime polymorphism:", qAr: "تعدد أشكال وقت التشغيل:", options: ["Overloading", "Overriding", "Static methods", "Constructors"], correct: 1 }
      ]
    }
  };

  const week = weekData[weekNum];
  if (!week) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Week {weekNum} not found</h1>
          <button onClick={() => onNavigate('home')} className="px-6 py-3 bg-violet-600 text-white rounded-lg">Back to Home</button>
        </div>
      </div>
    );
  }

  const totalSteps = week.content.length + 1;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const handleAnswer = (qIndex, optIndex) => { if (!submitted) setAnswers({ ...answers, [qIndex]: optIndex }); };

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = week.exercises.filter((ex, i) => answers[i] === ex.correct).length;
    const score = Math.round((correct / week.exercises.length) * 100);
    onExerciseComplete(weekNum, score);
  };

  const renderContent = (item, index) => {
    if (item.type === 'intro') {
      return (<div key={index} className="bg-gradient-to-r from-violet-900/50 to-slate-800/50 rounded-2xl p-8 border border-violet-500/30"><h2 className="text-2xl font-bold text-white mb-2">{item.titleEn}</h2><p className="text-violet-300/70 font-arabic mb-4">{item.titleAr}</p><p className="text-slate-300 mb-2">{item.contentEn}</p><p className="text-violet-300/70 font-arabic">{item.contentAr}</p></div>);
    }
    if (item.type === 'concept') {
      return (<div key={index} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"><h3 className="text-xl font-bold text-white mb-2">{item.titleEn}</h3><p className="text-violet-300/70 font-arabic mb-4">{item.titleAr}</p><p className="text-slate-300 mb-2">{item.contentEn}</p><p className="text-violet-300/70 font-arabic mb-4">{item.contentAr}</p>{item.keyPoints && (<ul className="space-y-2">{item.keyPoints.map((point, i) => (<li key={i} className="flex items-start gap-2"><span className="text-violet-400 mt-1">•</span><div><span className="text-white">{point.en}</span><span className="text-violet-300/70 font-arabic block text-sm">{point.ar}</span></div></li>))}</ul>)}</div>);
    }
    if (item.type === 'code') {
      return (<div key={index} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"><h3 className="text-xl font-bold text-white mb-2">{item.titleEn}</h3><p className="text-violet-300/70 font-arabic mb-4">{item.titleAr}</p><pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto mb-4"><code className="text-violet-400 text-sm">{item.code}</code></pre><p className="text-slate-300 text-sm">{item.explanation}</p><p className="text-violet-300/70 font-arabic text-sm">{item.explanationAr}</p></div>);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900/30">
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-slate-400 hover:text-white"><span>←</span> Back</button>
            <div className="text-center"><h1 className="text-white font-bold text-sm">Week {weekNum}</h1><p className="text-violet-300/70 text-xs">{week.titleEn}</p></div>
            <button onClick={onLogout} className="text-red-400 text-sm">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2"><span>Step {currentStep + 1} of {totalSteps}</span><span>{progressPercent}% Complete</span></div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-violet-500 to-violet-400 transition-all" style={{ width: `${progressPercent}%` }} /></div>
        </div>

        {currentStep === 0 && week.video && (
          <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 mb-8">
            <div className="aspect-video"><iframe className="w-full h-full" src={`https://www.youtube.com/embed/${week.video.youtubeId}`} title={week.video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
            <div className="p-6"><h2 className="text-xl font-bold text-white mb-1">{week.video.title}</h2><p className="text-violet-300/70 font-arabic mb-2">{week.video.titleAr}</p><p className="text-slate-400 text-sm">{week.video.description}</p></div>
          </div>
        )}

        {currentStep > 0 && currentStep <= week.content.length && (<div className="mb-8">{renderContent(week.content[currentStep - 1], currentStep - 1)}</div>)}

        {showExercise && (
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Exercise | تمرين</h2>
            <div className="space-y-6">
              {week.exercises.map((ex, qIndex) => (
                <div key={qIndex} className="bg-slate-700/30 rounded-xl p-6">
                  <p className="text-white font-medium mb-1">{qIndex + 1}. {ex.q}</p>
                  <p className="text-violet-300/70 font-arabic text-sm mb-4">{ex.qAr}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ex.options.map((opt, optIndex) => {
                      const isSelected = answers[qIndex] === optIndex;
                      const isCorrect = ex.correct === optIndex;
                      let btnClass = 'p-3 rounded-lg border text-left transition-all ';
                      if (submitted) {
                        if (isCorrect) btnClass += 'bg-violet-600/30 border-violet-500 text-violet-300';
                        else if (isSelected && !isCorrect) btnClass += 'bg-red-600/30 border-red-500 text-red-300';
                        else btnClass += 'bg-slate-700/50 border-slate-600 text-slate-400';
                      } else {
                        btnClass += isSelected ? 'bg-violet-600/30 border-violet-500 text-white' : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-violet-500/50';
                      }
                      return (<button key={optIndex} onClick={() => handleAnswer(qIndex, optIndex)} className={btnClass} disabled={submitted}>{opt}</button>);
                    })}
                  </div>
                </div>
              ))}
            </div>
            {!submitted ? (
              <button onClick={handleSubmit} disabled={Object.keys(answers).length < week.exercises.length} className="mt-6 w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-lg">Submit Answers | إرسال الإجابات</button>
            ) : (
              <div className="mt-6 text-center">
                <div className="text-4xl font-bold text-violet-400 mb-2">{Math.round((week.exercises.filter((ex, i) => answers[i] === ex.correct).length / week.exercises.length) * 100)}%</div>
                <p className="text-slate-400">{week.exercises.filter((ex, i) => answers[i] === ex.correct).length} / {week.exercises.length} correct</p>
                <button onClick={() => onNavigate('home')} className="mt-4 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg">Back to Course | العودة للدورة</button>
              </div>
            )}
          </div>
        )}

        {!showExercise && (
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg">← Previous</button>
            {currentStep < week.content.length ? (
              <button onClick={() => setCurrentStep(currentStep + 1)} className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg">Next →</button>
            ) : (
              <button onClick={() => setShowExercise(true)} className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg">Start Exercise | بدء التمرين</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeekLesson;
