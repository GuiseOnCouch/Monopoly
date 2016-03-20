/*
 * Monopoly - Socialism Version
 *
 * Guise on Couch
 *
 * Authors: Travis Heller and Sam Dixon
 *
 * Version 0.0.2 - March 19, 2016
 */

import java.util.*;
import java.io.*;
public class Monopoly{
   static PlayerList Players = new PlayerList();
   public static void main(String[] args){
      System.out.println("Welcome to Monopoly");
      handlePlayers();
      playGame();
      
   
   }

   /*
    * PlayerList Linked List of Player nodes
    */
   public static class PlayerList {
      public Player front;
      private int size;
      private int totalScore;
      public Player curr;
      
      // Constructor
      public PlayerList() {
         front = null;
         size = 0;
         totalScore = 0;
         curr = front;
      }
      
      /*
       * Player node data class
       */
      private class Player {
         int score;
         int money;
         private String name;
         private int id;
         Player next = front;
      
         // Constructor
         Player(String name) {
            score = 1500;
            money = 1500;
            if (name.equals("")) {
               this.name = "Player " + (size+1);
            } else {
               this.name = name;
            }
            id = size+1;
         }         
      
         public void addMoney(int num){
            money += num;
         }
         public int getMoney(){
            return money;
         }
         public int getScore(){
         //calculate score
            return score;
         }
         public void addScore(int num){
            score += num;
            totalScore += num;
         }
      
         public String getName() {
            return name;
         }
         public int getId() {
            return id;
         }
      }

      /*
       * Adds a Player node to the list
       */
      public void add(String name) {
         if (size == 0) {
            front = new Player(name);
            size += 1;
            curr = front;
            totalScore += 1500;
            return;
         }
         
         Player current = front;
         
         // iterate through the player list
         for (int i = 0; i < size-1; i++) {
            current = current.next;
         }
         current.next = new Player(name);
         size += 1;
         totalScore += 1500;
      }
      
      public void next() {
         curr = curr.next;
      }
      
      /*
       * Returns the player with the given name
       * Returns null if no player with given name is found
       */
      public Player getPlayerByName(String name) {
         Player curr = front;
         for (int i = 0; i < size; i++) {
            if (curr.getName().equals(name)) {
               return curr;
            }
         }
         return null;
      }
   }
   
   public static void handlePlayers(){
      System.out.println("How many players?");
      Scanner input = new Scanner(System.in);
      int numPlayers = 0;
      try{
         numPlayers = input.nextInt();
         input.nextLine();
      } catch(InputMismatchException ex) {
         System.out.println("Not a number. Try again.");
         handlePlayers();
         return;
      }
      
      // Initialize players
      for (int i = 1; i <= numPlayers; i++) {
         
         System.out.print("Player "+i+" name: ");
         
         Players.add(input.nextLine());
         if (i > 1) {
            Players.next();
         }
         String nameIn = Players.curr.getName();
         
         System.out.println("Player "+i+" created with name "+"'"+nameIn+"'");
      }
      
      System.out.println("Ok let's begin!");
      
   }
   
   public static void playGame() {
   
      currName = Players.curr.getName;
      currMoney = Players.curr.getMoney;
      currScore = Players.curr.getScore;
      System.out.println(currName +"'s Turn");
      System.out.println("\nScore: $" + currScore);
      System.out.println("Money: $" + currMoney);
      
      
   }
   
}